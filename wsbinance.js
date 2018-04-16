const binance = require('node-binance-api');
var ccxt = require ('ccxt');
var influent = require('influent');

binance.options({
  APIKEY: 'key',
  APISECRET: 'secret',
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: true // If you want to use sandbox mode where orders are simulated
});


var exchange = new ccxt.binance();
var markets = exchange.fetchMarkets(); 

influent.createHttpClient({
        server: [
            {
                protocol: "http",
                host:     "35.174.58.234",
                port:     8086
            }
        ],
        username: "admin",
        password: "admin@1234",        
        database: "coinexchange"
    }).then(function(client) {
      markets.then(result => {
        var symbol = [];
        result.forEach(function(data) {
          var market_name = data.base+"-"+data.quote;
          symbol[data.info.symbol] = market_name;
          // symbol.push({market_name:data.info.symbol});

        });
        var symbolVal = Object.values(symbol);
        var symbolKey = Object.keys(symbol);
        binance.websockets.trades(symbolKey, (trades) => {
          var market_name = symbol[trades.s];
          var orderType = (trades.m == true)?'SELL':'BUY';
          var price = parseFloat(trades.p);
          var quantity = parseFloat(trades.q);
          var timestamp = parseFloat(trades.T);
          var total = price * quantity;
          var buyQty = '';
          var sellQty = '';
          if(trades.m == true) {
              buyQty = 0; 
              sellQty = parseFloat(trades.p); 
          } else {
              buyQty = parseFloat(trades.p); 
              sellQty = 0; 
          }
   
          client.write({
              key: "binancetrade",
              tags: {
                  market_name: market_name,
                  order_type: orderType,
                  exchange: "Binance"
              },
              fields: {
                  rate: price,
                  quantity: quantity,
                  buyQty: buyQty,
                  sellQty: sellQty,
                  total: total,
                  timestamp: timestamp,      // is equal to new influent.Bool(true)
              },
              time: Date.now()
          });
          // let {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades;
          // console.log(symbol+" trade update. price: "+price+", quantity: "+quantity+", maker: "+maker);
        });
      });

    });