var express = require('express');
var router = express.Router();

var influent = require('influent');
var request = require("request")

// var client = require('./dbinfluxconn.js');
// client.dropMeasurement('poloniextrade').then(data => {
//     console.info(data);
// }).catch(err => {
//     console.error(err);
// });

var Influx = require('influxdb-nodejs');
var client = new Influx('http://35.174.58.234:8086/coinexchange');
    
router.get('/', function (req, res, next) {
    var reader = client.query('poloniextrade')
    .addFunction('max','timestamp');

    reader.then((valData) => {
        var since = valData.results[0].series[0].values[0][1]+1;
    // console.log("since : "+since);
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
            var curl = "https://poloniex.com/public?command=returnTicker";
            request({
                url: curl,
                json: true
            }, function (error, response, body) {

                if (!error && response.statusCode === 200) {
                	var resKey = Object.keys(body);
                	var symbol = [];
                	resKey.forEach(function(val) {
                		var marArr = val.split('_');
                        var marketName = marArr[1]+"-"+marArr[0];
                		symbol[val] = marketName;
                	});
                    var symbolKey = Object.keys(symbol);
                    var startTime = Math.floor(since / 1000);
                    var endTime = Math.floor(Date.now() / 1000);
                    console.log(startTime);
                    console.log(endTime);
                    symbolKey.forEach(function(data) {
                        var apicurl = "https://poloniex.com/public?command=returnTradeHistory&currencyPair="+data+"&start="+startTime+"&end="+endTime+"";
                        request({
                            url: apicurl,
                            json: true
                        }, function (error, response, body) {
                            if (!error && response.statusCode === 200) {

                                body.forEach(function(res) {

                                    var market_name = symbol[data];
                                    var orderType = res.type.toUpperCase();
                                    var price = parseFloat(res.rate);
                                    var quantity = parseFloat(res.amount);
                                    var total = parseFloat(res.total);
                                    var timestamp = Date.parse(res.date);

                                    // console.log(market_name);
                                    // console.log(orderType);
                                    // console.log(price);
                                    // console.log(quantity);
                                    // console.log(total);
                                    // console.log(timestamp);
                                    // console.log('------------XX----------');

                                    client.write({
                                        key: "poloniextrade",
                                        tags: {
                                            market_name: market_name,
                                            order_type: orderType,
                                            exchange: "Poloniex"
                                        },
                                        fields: {
                                            rate: price,
                                            quantity: quantity,
                                            total: total,
                                            timestamp: timestamp,      // is equal to new influent.Bool(true)
                                        },
                                        time: Date.now()
                                    });
                                    
                                })

                            }
                        });

                    });
                }
            })
        }).catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });
});
module.exports = router;