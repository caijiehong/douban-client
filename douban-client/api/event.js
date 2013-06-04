var DoubanApiBase = require('./base');

function Event(token) {
    var base = new DoubanApiBase(token);

    //获取同城活动
    base.get = function (id) {
        return this._get('/v2/event/' + id);
    };

    //获取同城活动列表
    base.list = function (loc, day_type, type, start, count) {
        return this._get('/v2/event/list', {loc: loc, day_type: day_type, type: type, start: (start || this.DEFAULT_START), count: (count || this.DEFAULT_COUNT)});
    };

    //搜索同城活动
    base.search = function (q, loc, start, count) {
        return this._get('/v2/event/search', {q: q, loc: loc, start: (start || this.DEFAULT_START), count: (count || this.DEFAULT_COUNT)});
    };

    //参加同城活动
    base.join = function (id) {
        return this._post('/v2/event/' + id + '/participants');
    };

    //取消参加同城活动
    base.quit = function (id) {
        return this._delete('/v2/event/' + id + '/participants');
    };

    //对同城活动感兴趣
    base.wish = function (id) {
        return this._post('/v2/event/' + id + '/wishers');
    };

    //取消同城活动兴趣
    base.unwish = function (id) {
        return this._delete('/v2/event/' + id + '/wishers');
    };

    //某同城活动参加者
    base.participants = function (id, start, count) {
        return this._get('/v2/event/' + id + '/participants', {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT })
    };

    //某同城活动感兴趣者
    base.wishers = function (id, start, count) {
        return this._get('/v2/event/' + id + '/wishers', {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT })
    };

    //获取用户创建过的同城活动
    base.owned = function (user_id, start, count) {
        return this._get('/v2/event/user_created/' + user_id, {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT })
    };

    //获取用户参加过的同城活动
    base.participated = function (user_id, start, count) {
        return this._get('/v2/event/user_participated/' + user_id, {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT })
    };

    //获取用户感兴趣的同城活动
    base.wished = function (user_id, start, count) {
        return this._get('/v2/event/user_wished/' + user_id, {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT })
    };

    return base;
}

module.exports = Event;