var DoubanApiBase = require('./base');

function Album(douBase) {
    var f = function(){ }
    f.prototype = douBase

    var base = new f();

    //获取一个相册
    base.get = function (id) {
        return this._get('/v2/album/' + id);
    };

    //新建一个相册
    base.new = function (title, desc, order, privacy) {
        return this._post('/v2/albums/', null, {title: title, desc: desc, privacy: privacy || 'public', order: order || 'desc'});
    };

    //更新一个相册
    base.update = function (id, title, desc, order, privacy) {
        return this._put('/v2/album/' + id, null, {title: title, desc: desc, privacy: privacy || 'public', order: order || 'desc'});
    };

    //删除一个相册
    base.delete = function (id) {
        return this._delete('/v2/album/' + id);
    };

    //喜欢一个相册
    base.like = function (id) {
        return this._post('/v2/album/' + id + '/like');
    };

    //取消喜欢一个相册
    base.unlike = function (id) {
        return this._delete('/v2/album/' + id + '/like');
    };

    //获取用户相册列表
    base.list = function (user_id, start, count) {
        return this._get('/v2/album/user_created/' + user_id, {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    //获取喜欢的相册列表
    base.liked_list = function (user_id, format, start, count) {
        return this._get('/v2/album/user_liked/' + user_id, {format: format || 'text', start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    //获取相册图片列表
    base.photos = function (id, start, count, order, sortby) {
        return this._get('/v2/note/' + id + '/photos', {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT, order: order || '', sortby: sortby || 'time'});
    };

    return base;
}

module.exports = Album;