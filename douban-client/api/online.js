var DoubanApiBase = require('./base');

function Online(douBase) {
    var f = function(){ }
    f.prototype = douBase

    var base = new f();

    //获取一条线上活动
    base.get = function (id) {
        return this._get('/v2/online/' + id);
    };

    //发表一条线上活动
    base.new = function (title, desc, begin_time, end_time) {
        return this._post('/v2/onlines', null, {title: title, desc: desc, begin_time: begin_time, end_time: end_time});
    };

    //更新一条线上活动
    base.update = function (id, title, desc, begin_time, end_time) {
        return this._put('/v2/online/' + id, null, {title: title, desc: desc, begin_time: begin_time, end_time: end_time});
    };

    //删除一条线上活动
    base.delete = function (id) {
        return this._delete('/v2/online/' + id);
    };

    //参加一条线上活动
    base.join = function (id) {
        return this._post('/v2/online/' + id + '/participants');
    };

    //取消参加线上活动
    base.quit = function (id) {
        return this._delete('/v2/online/' + id + '/participants');
    };

    //喜欢一条线上活动
    base.like = function (id) {
        return this._post('/v2/online/' + id + '/like');
    };

    //取消喜欢一条线上活动
    base.unlike = function (id) {
        return this._delete('/v2/online/' + id + '/like');
    };

    //获取线上活动图片列表
    base.photos = function (id, start, count) {
        return this._get('/v2/online/' + id + '/photos', {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT })
    };

    //上传图片到线上活动
    base.upload = function (id, image) {
        return this._post('/v2/online/' + id + '/photos', {image: image});
    };

    //获取线上活动讨论列表
    base.discussions = function (id, start, count) {
        return this._get('/v2/online/' + id + '/discussions', {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT })
    };

    //在线上活动新发讨论
    base.discussion = {
        new: function (id, title, content) {
            return this._post('/v2/online/' + id + '/discussions', null, {title: title, content: content});
        }
    };

    //获取参加线上活动成员列表
    base.participants = function (id, start, count) {
        return this._get('/v2/online/' + id + '/participants', {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT })
    };

    //获取线上活动列表
    base.list = function (cate, start, end) {
        return this._get('/v2/onlines', {cate: cate, start: start, end: end})
    };

    //获取参加过的活动
    base.joined = function (user_id, start, count) {
        return this._get('/v2/online/user_participated/' + user_id, {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT })
    };

    //获取创建过的活动
    base.created = function (user_id, start, count) {
        return this._get('/v2/online/user_created/' + user_id, {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT })
    };

    return base;
}

module.exports = Online;