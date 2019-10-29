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
            htokenDeploy: function(callback) {
                OPTIONS.url = HOST+'/operators/htoken/deploy';
                OPTIONS.body = JSON.stringify({
                    "method": "",
                    "params": {
                    }
                });
                request.post(OPTIONS, function(err, res, result){
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            },
            htokenInit: function(contract, callback) {
                OPTIONS.url = HOST+'/operators/htoken/'+contract;
                OPTIONS.body = JSON.stringify({
                    "method": "setTokenInfo",
                    "params": {
                        "_tokenTotalSupply": 100000000,
                        "_tokenNm": "0x4f5a303030310000000000000000000000000000000000000000000000000000",
                        "_tokenPrice": 50,
                        "_tokenId": "0x4f5a303030310000000000000000000000000000000000000000000000000001"
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