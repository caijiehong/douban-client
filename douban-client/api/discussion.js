var DoubanApiBase = require('./base');

function Discussion(token) {
    var base = new DoubanApiBase(token);

    //获取帖子
    base.get = function (id) {
        return this._get('/v2/discussion/' + id);
    };

    //发表帖子
    base.new = function (id, title, content) {
        return this._post('/v2/discussions/' + id, null, {title: title, content: content});
    };

    //更新帖子
    base.update = function (id, title, content) {
        return this._put('/v2/discussion/' + id, null, {title: title, content: content});
    };

    //删除帖子
    base.delete = function (id) {
        return this._delete('/v2/discussion/' + id);
    };

    //获取帖子列表
    base.list = function (id, start, count) {
        return this._get('/v2/target/' + id + '/discussions', {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    //获取回复列表
    base.comments = function (id, start, count) {
        return this._get('/v2/discussion/' + id + '/comments', {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    base.comment = {
        //新加一条回复
        'new': function (id, text) {
            return base._post('/v2/discussion/' + id + '/comments', null, {text: text});
        },
        //获取一条回复
        'get': function (id, comment_id) {
            return base._get('/v2/discussion/' + id + '/comment/' + comment_id);
        },
        //删除一条回复
        'delete': function (id, comment_id) {
            return base._delete('/v2/discussion/' + id + '/comment/' + comment_id);
        }
    };

    return base;
}

module.exports = Discussion;