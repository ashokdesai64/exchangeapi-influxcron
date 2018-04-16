var bittrex = require('./node_modules/node.bittrex.api/node.bittrex.api.js');
var influent = require('influent');
const {TickerStream, OrderBookStream, Bitstamp, CURRENCY} = require("node-bitstamp");

// var client = require('./dbinfluxconn.js');
// client.dropMeasurement('bitstamptrade').then(data => {
//     console.info(data);
// }).catch(err => {
//     console.error(err);
// });




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
        var resKey = Object.keys(CURRENCY);
        var resVal = Object.values(CURRENCY);

        // var resArr = [];
        // for (var i = 0; i < resKey.length; i++) {

        //     resArr[resKey[i]] =  resVal[i];
        // }

        resVal.forEach(function(val,key) {
            const tickerStream = new TickerStream();
            const tickerTopic = tickerStream.subscribe(val);
            var marArr = resKey[key].split('_');
            var market_name = marArr[0]+"-"+marArr[1];
            tickerStream.on(tickerTopic, res => {
                var total = res.price*res.amount;
                var buyQty = '';
                var sellQty = '';

                if(res.type=='0') {
                    buyQty = res.amount; 
                    sellQty = 0; 
                } else {
                    buyQty = 0; 
                    sellQty = res.amount; 
                }
                var orderType = (res.type == 1)?'SELL':'BUY';
                client.write({
                    key: "bitstamptrade",
                    tags: {
                        market_name: market_name,
                        order_type: orderType,
                        exchange: "Bitstamp"
                    },
                    fields: {
                        rate: res.price,
                        quantity: res.amount,
                        buyQty: buyQty,
                        sellQty: sellQty,
                        total: total,
                        timestamp: res.timestamp,      // is equal to new influent.Bool(true)
                    },
                    time: Date.now()
                });
            });
        }, this);
    });