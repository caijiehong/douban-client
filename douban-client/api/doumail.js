var DoubanApiBase = require('./base')
    , util = require('util');

function Doumail(douBase) {
    var f = function(){ }
    f.prototype = douBase

    var base = new f();

    //获取一封豆邮
    base.get = function (id) {
        return this._get('/v2/doumail/' + id);
    };

    //新写一封豆邮
    base.new = function (title, content, receiver_id) {
        return this._post('/v2/doumails', null, {title: title, content: content, receiver_id: receiver_id});
    };

    //标记一封豆邮
    base.read = function (id) {
        return this._put('/v2/doumail/' + id);
    };

    //批量标记豆邮
    base.reads = function (ids) {
        var _ids = util.isArray(ids) ? ids.join(',') : ids;
        return this._put('/v2/doumail/read', {ids: _ids});
    };

    //删除一封豆邮
    base.delete = function (id) {
        return this._delete('/v2/doumail/' + id);
    };

    //批量删除豆邮
    base.deletes = function (ids) {
        var _ids = util.isArray(ids) ? ids.join(',') : ids;
        return this._delete('/v2/doumail/delete', {ids: _ids});
    };

    //豆邮收件箱列表
    base.inbox = function (start, count) {
        return this._get('/v2/doumail/inbox', {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    //豆邮发件箱列表
    base.outbox = function (start, count) {
        return this._get('/v2/doumail/outbox', {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    //未读豆邮列表
    base.unread = function (start, count) {
        return this._get('/v2/doumail/unread', {start: start || this.DEFAULT_START, count: count || this.DEFAULT_COUNT});
    };

    return base;
}

module.exports = Doumail;