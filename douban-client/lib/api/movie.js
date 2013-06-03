var DoubanApiBase = require('./base');

function Movie(token) {
    var base = new DoubanApiBase(token);

    //获取一部电影信息
    base.get = function (id) {
        return this._get('/v2/movie/subject/' + id);
    };

    //获取影人信息
    base.celebrity = function (celebrity_id) {
        return this._get('/v2/movie/celebrity/' + id);
    };

    //获取影人作品信息
    base.celebrity_works = function (celebrity_id) {
        return this._get('/v2/movie/celebrity/' + id + '/works');
    };

    //通过imdb获取电影
    base.imdb = function (imdb_number) {
        return this._get('/v2/movie/imdb/' + album_id);
    };

    //搜索电影信息
    base.search = function (q, tag, start, count) {
        return this._get('/v2/movie/search', {q: q, tag: tag, start: (start || this.DEFAULT_START), count: (count || this.DEFAULT_COUNT)});
    };

    //获取电影标签
    base.tags = function (id) {
        return this._get('/v2/movie/' + id + '/tags');
    };

    //获取用户标签
    base.tagged_list = function (user_id) {
        return this._get('/v2/movie/user_tags/' + user_id);
    };

    base.review = {
        //发表一条影评
        'new': function (bookId, title, content) {
            return base._post('/v2/movie/reviews', null, {book: bookId, title: title, content: content});
        },
        //更新一条影评
        'update': function (review_id, title, content) {
            return base._put('/v2/movie/review/' + review_id, {title: title, content: content});
        },
        //删除一条影评
        'delete': function (review_id) {
            return base._delete('/v2/movie/review/' + review_id);
        }
    };

    return base;
}

module.exports = Movie;