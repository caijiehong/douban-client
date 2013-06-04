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
    };

    //删除一条广播
    base.delete = function (id) {
        return this._delete('/shuo/v2/statuses/' + id, null);
    };

    //推荐网址
    base.rec = function (title, url, desc, img) {
        return this._post('/shuo/v2/statuses/', null, {source: this.apiKey, text: desc, rec_title: title, rec_url: url, rec_desc: desc});
    };

    //获取某广播回复列表
    base.comments = function (id) {
        return this._get('/shuo/v2/statuses/' + id + '/comments');
    };

    base.comment = {
        //回复某条广播
        'new': function (id, text) {
            return base._post('/shuo/v2/statuses/' + id + '/comments', null, {text: text});
        },
        //获取某条广播回复
        'get': function (comment_id) {
            return base._get('/shuo/v2/statuses/comment/' + comment_id);
        },
        //删除某条广播回复
        'delete': function (comment_id) {
            return base._delete('/shuo/v2/statuses/comment/' + comment_id);
        }
    };

    //赞广播
    base.like = function (id) {
        return this._post('/shuo/v2/statuses/' + id + '/like');
    };

    //取消赞
    base.unlike = function (id) {
        return this._delete('/shuo/v2/statuses/' + id + '/like');
    };

    //赞某广播用户列表
    base.likers = function (id) {
        return this._get('/shuo/v2/statuses/' + id + '/like');
    };

    //转发广播
    base.reshare = function(id){
        return this._post('/shuo/v2/statuses/' + id + '/reshare');
    };

    //转发某广播的用户列表
    base.resharers = function(id){
        return this._get('/shuo/v2/statuses/' + id + '/reshare');
    };

    return base;
}

module.exports = Miniblog;