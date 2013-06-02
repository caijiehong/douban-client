var MongoClient = require('mongodb').MongoClient
    ,settings = require('../settings');

function Mongoda(){
    var _t = this;
    var _db = null;

    this.open = function(onOpen){
        MongoClient.connect(settings.dbUrl, function (err, db) {
            _db = db;
            onOpen(err, _t);
        });
        return this;
    };

    this.close = function(){
        if(_db){
            _db.close();
        }
        return this;
    };

    this.collection = function(colletionName){
        return _db && _db.collection(colletionName);
    };

    return this;
}

module.exports = Mongoda;