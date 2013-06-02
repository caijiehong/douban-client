var DoubanApiBase = require('./base');

function Miniblog(token) {
    var base = new DoubanApiBase(token);

    //当前用户Timeline
    base.home_timeline = function (count) {
        return this._get('/shuo/v2/statuses/home_timeline', {count: count || this.DEFAULT_COUNT});
    };

    //指定用户Timeline
    base.user_timeline = function (user_id, count) {
        return this._get('/shuo/v2/statuses/user_timeline/' + user_id, {count: count || this.DEFAULT_COUNT});
    };

    //@当前用户的广播
    base.mentions = function (count) {
        return this._get('/shuo/v2/statuses/mentions', {count: count || this.DEFAULT_COUNT});
    };

    //获取一条广播
    base.get = function (id) {
        return this._get('/shuo/v2/statuses/' + id, null);
    };

    //新写一条广播
    base.new = function (text) {
        return this._post('/shuo/v2/statuses/', null, {source: this.apiKey, text: text});
    }

    //新写一条广播
    base.delete = function (id) {
        return this._post('/shuo/v2/statuses/', null, {source: this.apiKey, text: text});
    }

    return base;
}

module.exports = Miniblog;