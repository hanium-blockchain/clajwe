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
            htokenInit: function(callback) {
                OPTIONS.url = HOST+'/operators/htoken/0x464dE7103Bf9964904d09D140BD831Af003f6969';
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
            assetTokenize: function(callback){ // asset token 배포 
                OPTIONS.url = HOST + '/operators/asset-token/deploy';
                OPTIONS.body = JSON.stringify();
                request.post(OPTIONS, function(err, res, result){
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            },
            cloudsaleDeploy: function(callback){ 
                OPTIONS.url = HOST + '/operators/at-crowdsale/deploy';
                OPTIONS.body = JSON.stringify({
                    "method": "",
                    "params": {}
                });
                request.post(OPTIONS, function(err, res, result){
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            },
            cloudsaleSetting: function(contract, htokenAddr, atokenAddr, callback){ 
                OPTIONS.url = HOST + '/operators/at-crowdsale/'+ contract;
                OPTIONS.body = JSON.stringify({
                    "method": "setAssetTokenCrowdsale",
                    "params": {
                        "_htokenAddr": "0x464dE7103Bf9964904d09D140BD831Af003f6969",
                        "_htokenOwnerAddr": "0x0F20E58D0c54d28f336CBf9536cAa8675D33D705",
                        "_assettokenAddr": atokenAddr,
                        "_assettokenOwnerAddr": "0x0F20E58D0c54d28f336CBf9536cAa8675D33D705",
                        "_crowdfundingendday": 20180820
                    }
                });
                request.post(OPTIONS, function(err, res, result){
                    statusCodeErrorHandler(res.statusCode, callback, result);
                });
            },

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