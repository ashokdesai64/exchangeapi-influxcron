var Gdax = require('gdax');

var ccxt = require ('ccxt');
var influent = require('influent');

var exchange = new ccxt.gdax();
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
          symbol.push(data.id);
        });

        const websocket = new Gdax.WebsocketClient(symbol);
        websocket.on('message', data => {
            if(data.type == 'match') {
                console.log(data);
                var market_name = data.product_id;
                var orderType = data.side.toUpperCase();
                var price = parseFloat(data.price);
                var quantity = parseFloat(data.size);
                var timestamp = parseFloat(Date.parse(data.time));
                var total = price*quantity;

                var buyQty = '';
                var sellQty = '';
                if(data.side == 'sell') {
                    buyQty = 0; 
                    sellQty = parseFloat(data.price); 
                } else {
                    buyQty = parseFloat(data.price); 
                    sellQty = 0; 
                }

                client.write({
                    key: "gdaxtrade",
                    tags: {
                        market_name: market_name,
                        order_type: orderType,
                        exchange: "GDAX"
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
            }
          /* work with data */
        });
      });
    });