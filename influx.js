var bittrex = require('./node_modules/node.bittrex.api/node.bittrex.api.js');
var influent = require('influent');
influent.createHttpClient({
        server: [
            {
                protocol: "https",
                host:     "hillvalley-1cbb155a.influxcloud.net",
                port:     8086
            }
        ],
        username: "logistics@motocho.io",
        password: "ExchangeAPI",        
        database: "coinexchange"
    }).then(function(client) {
            bittrex.websockets.client(function() {
            console.log('Websocket connected');
            bittrex.websockets.subscribe(['BTC-1ST', 'BTC-2GIVE', 'BTC-ABY', 'BTC-ADA', 'BTC-ADT', 'BTC-ADX', 'BTC-AEON', 'BTC-AGRS', 'BTC-AMP', 'BTC-ANT', 'BTC-ARDR', 'BTC-ARK', 'BTC-AUR', 'BTC-BAT', 'BTC-BAY', 'BTC-BCC', 'BTC-BCPT', 'BTC-BCY', 'BTC-BITB', 'BTC-BLITZ', 'BTC-BLK', 'BTC-BLOCK', 'BTC-BNT', 'BTC-BRK', 'BTC-BRX', 'BTC-BSD', 'BTC-BTG', 'BTC-BURST', 'BTC-BYC', 'BTC-CANN', 'BTC-CFI', 'BTC-CLAM', 'BTC-CLOAK', 'BTC-CLUB', 'BTC-COVAL', 'BTC-CPC', 'BTC-CRB', 'BTC-CRW', 'BTC-CURE', 'BTC-CVC', 'BTC-DASH', 'BTC-DCR', 'BTC-DCT', 'BTC-DGB', 'BTC-DMD', 'BTC-DNT', 'BTC-DOGE', 'BTC-DOPE', 'BTC-DTB', 'BTC-DYN', 'BTC-EBST', 'BTC-EDG', 'BTC-EFL', 'BTC-EGC', 'BTC-EMC', 'BTC-EMC2', 'BTC-ENG', 'BTC-ENRG', 'BTC-ERC', 'BTC-ETC', 'BTC-ETH', 'BTC-EXCL', 'BTC-EXP', 'BTC-FAIR', 'BTC-FCT', 'BTC-FLDC', 'BTC-FLO', 'BTC-FTC', 'BTC-GAM', 'BTC-GAME', 'BTC-GBG', 'BTC-GBYTE', 'BTC-GCR', 'BTC-GEO', 'BTC-GLD', 'BTC-GNO', 'BTC-GNT', 'BTC-GOLOS', 'BTC-GRC', 'BTC-GRS', 'BTC-GUP', 'BTC-HMQ', 'BTC-IGNIS', 'BTC-INCNT', 'BTC-INFX', 'BTC-IOC', 'BTC-ION', 'BTC-IOP', 'BTC-KMD', 'BTC-KORE', 'BTC-LBC', 'BTC-LGD', 'BTC-LMC', 'BTC-LSK', 'BTC-LTC', 'BTC-LUN', 'BTC-MAID', 'BTC-MANA', 'BTC-MCO', 'BTC-MEME', 'BTC-MER', 'BTC-MLN', 'BTC-MONA', 'BTC-MUE', 'BTC-MUSIC', 'BTC-NAV', 'BTC-NBT', 'BTC-NEO', 'BTC-NEOS', 'BTC-NLG', 'BTC-NMR', 'BTC-NXC', 'BTC-NXS', 'BTC-NXT', 'BTC-OK', 'BTC-OMG', 'BTC-OMNI', 'BTC-PART', 'BTC-PAY', 'BTC-PDC', 'BTC-PINK', 'BTC-PIVX', 'BTC-PKB', 'BTC-POT', 'BTC-POWR', 'BTC-PPC', 'BTC-PTC', 'BTC-PTOY', 'BTC-QRL', 'BTC-QTUM', 'BTC-QWARK', 'BTC-RADS', 'BTC-RBY', 'BTC-RCN', 'BTC-RDD', 'BTC-REP', 'BTC-RLC', 'BTC-SALT', 'BTC-SBD', 'BTC-SC', 'BTC-SEQ', 'BTC-SHIFT', 'BTC-SIB', 'BTC-SLR', 'BTC-SLS', 'BTC-SNRG', 'BTC-SNT', 'BTC-SPHR', 'BTC-SPR', 'BTC-SRN', 'BTC-START', 'BTC-STEEM', 'BTC-STORJ', 'BTC-STRAT', 'BTC-SWIFT', 'BTC-SWT', 'BTC-SYNX', 'BTC-SYS', 'BTC-THC', 'BTC-TIX', 'BTC-TKS', 'BTC-TRST', 'BTC-TRUST', 'BTC-TX', 'BTC-UBQ', 'BTC-UKG', 'BTC-UNB', 'BTC-VEE', 'BTC-VIA', 'BTC-VIB', 'BTC-VOX', 'BTC-VRC', 'BTC-VRM', 'BTC-VTC', 'BTC-VTR', 'BTC-WAVES', 'BTC-WAX', 'BTC-WINGS', 'BTC-XCP', 'BTC-XDN', 'BTC-XEL', 'BTC-XEM', 'BTC-XLM', 'BTC-XMG', 'BTC-XMR', 'BTC-XMY', 'BTC-XRP', 'BTC-XST', 'BTC-XVC', 'BTC-XVG', 'BTC-XWC', 'BTC-XZC', 'BTC-ZCL', 'BTC-ZEC', 'BTC-ZEN', 'BTC-ZRX', 'ETH-1ST', 'ETH-ADA', 'ETH-ADT', 'ETH-ADX', 'ETH-ANT', 'ETH-BAT', 'ETH-BCC', 'ETH-BCPT', 'ETH-BNT', 'ETH-BTG', 'ETH-CFI', 'ETH-CRB', 'ETH-CVC', 'ETH-DASH', 'ETH-DGB', 'ETH-DNT', 'ETH-ENG', 'ETH-ETC', 'ETH-FCT', 'ETH-GNO', 'ETH-GNT', 'ETH-GUP', 'ETH-HMQ', 'ETH-LGD', 'ETH-LTC', 'ETH-LUN', 'ETH-MANA', 'ETH-MCO', 'ETH-NEO', 'ETH-NMR', 'ETH-OMG', 'ETH-PAY', 'ETH-POWR', 'ETH-PTOY', 'ETH-QRL', 'ETH-QTUM', 'ETH-RCN', 'ETH-REP', 'ETH-RLC', 'ETH-SALT', 'ETH-SC', 'ETH-SNT', 'ETH-SRN', 'ETH-STORJ', 'ETH-STRAT', 'ETH-TIX', 'ETH-TRST', 'ETH-UKG', 'ETH-VEE', 'ETH-VIB', 'ETH-WAVES', 'ETH-WAX', 'ETH-WINGS', 'ETH-XEM', 'ETH-XLM', 'ETH-XMR', 'ETH-XRP', 'ETH-ZEC', 'ETH-ZRX', 'USDT-ADA', 'USDT-BCC', 'USDT-BTC', 'USDT-BTG', 'USDT-DASH', 'USDT-ETC', 'USDT-ETH', 'USDT-LTC', 'USDT-NEO', 'USDT-NXT', 'USDT-OMG', 'USDT-XMR', 'USDT-XRP', 'USDT-XVG', 'USDT-ZEC', 'BTC-LTC'], function(data) {
                if (data.M === 'updateExchangeState') {
                data.A.forEach(function(data_for) {
                    if(data_for.Fills.length > 0) {
                        data_for.Fills.forEach(function(tradedata) {
                            console.log(tradedata); 
                            client.write({
                                key: "bittrextrade",
                                tags: {
                                    market_name: data_for.MarketName,
                                    order_type: tradedata.OrderType,
                                    exchange: "Bittrex"
                                },
                                fields: {
                                    rate: tradedata.Rate,
                                    quantity: tradedata.Quantity,
                                    timestamp: Date.parse(tradedata.TimeStamp),      // is equal to new influent.Bool(true)
                                },
                                time: Date.now()
                            });   
                        });    
                    }                   
                });
                }
            });
        });
    });