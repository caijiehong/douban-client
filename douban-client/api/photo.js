var DoubanApiBase = require('./base');

function Photo(douBase) {
    var f = function(){ }
    f.prototype = douBase

    var base = new f();

    //获取一张图片
    base.get = function (id) {
        return this._get('/v2/photo/' + id);
    };

    //上传一张图片
    base.new = function (album_id, image, desc) {
        return this._post('/v2/album/' + album_id, null, {desc: desc, image: image});
    };

    //更新图片描述
    base.update = function (id, desc) {
        return this._put('/v2/photo/' + id, null, {desc: desc});
    };

    //删除一张图片
    base.delete = function (id) {
        return this._delete('/v2/photo/' + id);
    };

    //喜欢一张图片
    base.like = function (id) {
        return this._post('/v2/photo/' + id + '/like');
    };

    //取消喜欢一张图片
    base.unlike = function (id) {
        return this._delete('/v2/photo/' + id + '/like');
    };

    //获取回复列表
    base.comments = function (id, start, count) {
        return this._get('/v2/photo/' + id + '/comments', {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    base.comment = {
        //新加一条回复
        'new': function (id, text) {
            return base._post('/v2/photo/' + id + '/comments', null, {text: text});
        },
        //获取一条回复
        'get': function (id, comment_id) {
            return base._get('/v2/photo/' + id + '/comment/' + comment_id);
        },
        //删除一条回复
        'delete': function (id, comment_id) {
            return base._delete('/v2/photo/' + id + '/comment/' + comment_id);
        }
    };

    return base;
}

module.exports = Photo;