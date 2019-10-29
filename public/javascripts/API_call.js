const request = require('request');

module.exports = function() {
    function API_Call() {
        var OPTIONS = {
            headers: {'Content-Type' : 'application/json'},
            url:null,
            body: null
        };
        const HOST = 'http://3.19.244.221:8080'
        return {
            createWallet: function(callback){
                OPTIONS.url = HOST+'/wallets';
                OPTIONS.body = JSON.stringify();
                request.post(OPTIONS, function(err, res, result){
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            },
            saveWallet: function(address, callback) {
                OPTIONS.url = HOST+'/wallets/save';
                OPTIONS.body = JSON.stringify({
                    "address": address
                });
                request.post(OPTIONS, function(err, res, result){
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            },
            hTokenTransfer: function( address, value,  callback){ // htoken transfer 
                OPTIONS.url = HOST + '/operators/htoken/' + '0x464dE7103Bf9964904d09D140BD831Af003f6969';
                OPTIONS.body = JSON.stringify({
                    "method": "transfer",
                    "params": {
                        "_to": address,
                        "_value": value
                    }
                });
                request.post(OPTIONS, function(err, res, result){
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            },

            assetTokenize: function(method, params, callback){ // asset token 배포 
                OPTIONS.url = HOST + '/operators/asset-token/deploy';
                OPTIONS.body = JSON.stringify();
                request.post(OPTIONS, function(err, res, result){
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            }


        };
    }


    function statusCodeErrorHandler(statusCode, callback, data){
        switch(statusCode) {
            case 200:
                callback(null, JSON.parse(data));
                break;
            default:
                callback('error', JSON.parse(data));
        }
    }

    var INSTANCE;

    if(INSTANCE == undefined){
        INSTANCE = new API_Call();
    }
    return INSTANCE;

};