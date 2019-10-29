var request = require('request');

module.exports = function(callee) {
    function API_Call(callee) {
        var OPTIONS = {
            headers: {'Content-Type' : 'application/json'},
            url:null,
            body: null
        };
        const PORT = 'http://3.19.244.221:8080'
        // const BASE_PATH = '/';
        var HOST = null;
        (function (){
            switch(callee){
                case('wallet'):
                    HOST = PORT + '/wallets'
                    break;
                default:
                    break;
            }
        })(callee);
        return {
            createWallet: function(callback){
                OPTIONS.url = HOST;
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
        INSTANCE = new API_Call(callee);
    }
    return INSTANCE;

};