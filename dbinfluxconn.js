const Influx = require('simple-influx');
const client = new Influx({
    username: 'admin',
    password: 'admin@1234',
    timePrecision: 'ms',
    host: '35.174.58.234',
    port: 8086,
    protocol: 'http',
    database: 'coinexchange'
});
module.exports=client;