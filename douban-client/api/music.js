var DoubanApiBase = require('./base');

function Music(douBase) {
    var f = function(){ }
    f.prototype = douBase

    var base = new f();

    //获取音乐信息
    base.get = function (id) {
        return this._get('/v2/music/' + id);
    };

    //搜索音乐信息
    base.search = function (q, tag, start, count) {
        return this._get('/v2/music/search', {q: q, tag: tag, start: (start || this.DEFAULT_START), count: (count || this.DEFAULT_COUNT)});
    };

    //获取图书标签
    base.tags = function (id) {
        return this._get('/v2/music/' + id + '/tags');
    };

    //获取用户标签
    base.tagged_list = function (user_id) {
        return this._get('/v2/music/user_tags/' + user_id);
    };

    base.review = {
        //发表一条乐评
        'new': function (musicId, title, content) {
            return base._post('/v2/music/reviews', null, {music: musicId, title: title, content: content});
        },
        //更新一条乐评
        'update': function (review_id, title, content) {
            return base._put('/v2/music/review/' + review_id, {title: title, content: content});
        },
        //删除一条乐评
        'delete': function (review_id) {
            return base._delete('/v2/music/review/' + review_id);
        }
    };

    return base;
}

module.exports = Music;