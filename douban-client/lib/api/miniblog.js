var DoubanApiBase = require('./base');

function Miniblog(token) {
    var base = new DoubanApiBase(token);

    base.userId = userId;
    base.username = username;

    //当前用户Timeline
    base.home_timeline = function (count) {
        return this._get('shuo/v2/statuses/home_timeline', {count: count || this.DEFAULT_COUNT});
    };

    //指定用户Timeline
    base.user_timeline = function (user_id, count) {
        return this._get('shuo/v2/statuses/user_timeline/' + user_id, {count: count || this.DEFAULT_COUNT});
    };

    //@当前用户的广播
    base.mentions = function (count) {
        return this._get('shuo/v2/statuses/mentions', {count: count || this.DEFAULT_COUNT});
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

    base.follow = function (id) {
        return this._post('/shuo/v2/friendships/create', null, {user_id: id, source: '0ce9be6dea250deb26bd3b49be6f29c1'});
    }

    base.followers = function (id, start, count) {
        return this._get('/shuo/v2/users/' + id + '/followers', { start: this.DEFAULT_START, count: this.DEFAULT_COUNT});
    }

    return base;
}

module.exports = Miniblog;