var DoubanApiBase = require('./base');

function Note(token) {
    var base = new DoubanApiBase(token);

    //获取一篇日记
    base.get = function (id, format) {
        return this._get('/v2/note/' + id);
    };

    //新写一篇日记
    base.new = function (title, content, privacy, can_reply) {
        return this._post('/v2/notes', null, {title: title, content: content, privacy: privacy || 'public', can_reply: can_reply || 'true'});
    };

    //更新一篇日记
    base.update = function (id, title, content, privacy, can_reply) {
        return this._put('/v2/note/' + id, null, {title: title, content: content, privacy: privacy || 'public', can_reply: can_reply || 'true'});
    };

    //删除一篇日记
    base.delete = function (id) {
        return this._delete('/v2/note/' + id);
    };

    //喜欢一篇日记
    base.like = function (id) {
        return this._post('/v2/note/' + id + '/like');
    };

    //取消喜欢一篇日记
    base.unlike = function (id) {
        return this._delete('/v2/note/' + id + '/unlike');
    };

    //获取用户日记列表
    base.list = function (user_id, start, count) {
        return this._get('/v2/note/user_created/' + user_id, {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    //获取喜欢的日记列表
    base.liked_list = function (user_id, format, start, count) {
        return this._get('/v2/note/user_liked/' + user_id, {format: format || 'text', start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    //获取回复列表
    base.comments = function (id, start, count) {
        return this._get('/v2/note/' + id + '/comments', {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    base.comment = {
        //新加一条回复
        'new': function (id, text) {
            return base._post('/v2/note/' + id + '/comments', null, {text: text});
        },
        //获取一条回复
        'get': function (id, comment_id) {
            return base._get('/v2/note/' + id + '/comment/' + comment_id);
        },
        //删除一条回复
        'delete': function (id, comment_id) {
            return base._delete('/v2/note/' + id + '/comment/' + comment_id);
        }
    };

    return base;
}

module.exports = Note;