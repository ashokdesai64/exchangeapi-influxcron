// var client = require('./dbinfluxconn.js');
// client.dropMeasurement('krakentrade').then(data => {
//     console.info(data);
// }).catch(err => {
//     console.error(err);
// });
var express = require('express');
var router = express.Router();

var ccxt = require ('ccxt');
var influent = require('influent');

var exchange = new ccxt.kraken();
var markets = exchange.fetchMarkets(); 
// var since = Date.now()+1;

var Influx = require('influxdb-nodejs');
var client = new Influx('http://35.174.58.234:8086/coinexchange');

router.get('/', function (req, res, next) {

    var reader = client.query('krakentrade')
    .addFunction('max','timestamp');
            // reader.start = '-'+params.period;
    reader.then((valData) => {
    var since = valData.results[0].series[0].values[0][1]+1;
    console.log("since : "+since);
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
                var pair = data.base+"/"+data.quote;
                symbol[pair] = market_name;
            });
            var symbolVal = Object.values(symbol);
            var symbolKey = Object.keys(symbol);

                
                symbolKey.forEach(function(val) {
                    var exchangeTrade = new ccxt.kraken();
                    var trades = exchangeTrade.fetchTrades(val,since); 

                    trades.then(tradeRes => {
                        tradeRes.forEach(function(res) {
                            var market_name = symbol[res.symbol];
                            var orderType = res.side.toUpperCase();
                            var price = parseFloat(res.price);
                            var quantity = parseFloat(res.amount);
                            var timestamp = parseFloat(res.timestamp);
                            var total = price*quantity;
                            console.log(timestamp)
                            
                            client.write({
                                key: "krakentrade",
                                tags: {
                                    market_name: market_name,
                                    order_type: orderType,
                                    exchange: "Kraken"
                                },
                                fields: {
                                    rate: price,
                                    quantity: quantity,
                                    total: total,
                                    timestamp: timestamp,      // is equal to new influent.Bool(true)
                                },
                                time: Date.now()
                            });


                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                });
            });
        });
    })
    .catch((err) => {
        console.log(err);
    });
});
module.exports = router;