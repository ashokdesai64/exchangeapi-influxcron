var BFX = require('bitfinex-api-node');
var ccxt = require ('ccxt');
var influent = require('influent');

var bfx = new BFX({
  apiKey: '',
  apiSecret: ''
 })
var ws = bfx.ws(2)

var exchange = new ccxt.bitfinex2();
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
            if(data.base == 'DASH') {

            }
          var market_name = data.base+"-"+data.quote;
          var pair = data.info.pair.toUpperCase();
          symbol[pair] = market_name;
        });
        var symbolVal = Object.values(symbol);
        var symbolKey = Object.keys(symbol);
            console.log(symbol);

        ws.on('error', (err) => console.log(err))
        symbolKey.forEach(function(val,key) {
            ws.on('open', () => {
            ws.subscribeTrades(val)
            })


            ws.onTradeUpdate({ pair: val }, (trades) => {
                var res = trades[0];
                console.log(res);
               
                var market_name = symbol[val];
                var orderType = (res[2] < 0)?'SELL':'BUY';
                var price = parseFloat(res[3]);
                var quantity = parseFloat(Math.abs(res[2]));
                var timestamp = parseFloat(res[1]);
                var total = price*quantity;

                var buyQty = '';
                var sellQty = '';
                if(orderType == 'SELL') {
                    buyQty = 0; 
                    sellQty = price; 
                } else {
                    buyQty = price; 
                    sellQty = 0; 
                }

              client.write({
                  key: "bitfinex2trade",
                  tags: {
                      market_name: market_name,
                      order_type: orderType,
                      exchange: "Bitfinex"
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
            
            })

        });

        ws.open()
        
   
      });
      
    });

