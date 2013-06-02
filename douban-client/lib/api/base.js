var events = require("events");

var DOUBAN_HOSTNAME = 'api.douban.com';

function DoubanApiBase(token, apiKey) {
    this.token = token;
    this.DEFAULT_START = 0;
    this.DEFAULT_COUNT = 20;
    this.apiKey = apiKey;

    this._get = function (path, query) {
        var eve = new events.EventEmitter();
        this.token.get(DOUBAN_HOSTNAME, path, query, function (err, data) {
            eve.emit('data', err, data);
        });
        return eve;
    }

    this._post = function (path, query, postdata) {
        var eve = new events.EventEmitter();
        this.token.post(DOUBAN_HOSTNAME, path, query, postdata, function (err, data) {
            eve.emit('data', err, data);
        });
        return eve;
    }

    this._delete = function (path, query) {
        var eve = new events.EventEmitter();
        this.token.delete(DOUBAN_HOSTNAME, path, query, function (err, data) {
            eve.emit('data', err, data);
        });
        return eve;
    }

    return this;
}

module.exports = DoubanApiBase;