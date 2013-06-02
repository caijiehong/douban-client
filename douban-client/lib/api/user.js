var DoubanApiBase = require('./base');

function User(token, apiKey) {
    var base = new DoubanApiBase(token, apiKey);

    base.me = function () {
        return this._get('/v2/user/~me', null);
    };

    base.get = function (id) {
        return this._get('/v2/user/' + id, null);
    };

    base.search = function (q, start, count) {
        return this._get('/v2/user', {q: q, start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    base.follow = function (id) {
        return this._post('/shuo/v2/friendships/create', null, {user_id: id, source: this.apiKey});
    };

    base.unfollow = function (id) {
        return this._post('/shuo/v2/friendships/destroy', null, {user_id: id, source: this.apiKey});
    };

    base.followers = function (id, start, count) {
        return this._get('/shuo/v2/users/' + id + '/followers', { start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    //关注信息
    base.following = function (id, start, count) {
        return this._get('/shuo/v2/users/' + id + '/following', { start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    base.friendships = function (target_id, source_id) {
        return this._get('/shuo/v2/friendships/show', { source: this.apiKey, source_id: source_id, target_id: target_id});
    };

    base.follow_in_common = function (id, start, count) {
        return this._get('/shuo/v2/users/' + id + '/follow_in_common', { start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    base.block = function (id) {
        return this._post('/shuo/v2/users/' + id + '/block', null, {user_id: id});
    };

    return base;
}

module.exports = User;