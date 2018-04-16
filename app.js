var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var validate = require('express-validation');

// var validation = require('./validation/login');
// var validate = require('express-validator');

var wskraken = require('./wskraken');
var wskucoin = require('./wskucoin');
var wscex = require('./wscex');
var wsgemini = require('./wsgemini');
var wspoloniex = require('./wspoloniex');

var app = express();
// var validation = require('./validation/login.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/cron/kraken', wskraken);
app.use('/cron/kucointrade', wskucoin);
app.use('/cron/cextrade', wscex);
app.use('/cron/geminitrade', wsgemini);
app.use('/cron/poloniextrade', wspoloniex);
// app.use('/api/v1', user);
// app.post('/api/v1/login', validate(validation.login), respond200);
// app.post('/api/v1/login', validate(validation.login), function(req, res){
//     console.log(req.body); // => { email: "user@domain", password: "pwd" }
//     res.json(200);
// });

module.exports = app;
