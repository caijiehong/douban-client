var DoubanApiBase = require('./base');

function Book(token) {
    var base = new DoubanApiBase(token);

    //获取一本图书信息
    base.get = function (id) {
        return this._get('/v2/book/' + id);
    };

    //通过isbn获取信息
    base.isbn = function (isbn_number) {
        return this._get('/v2/book/isbn/' + album_id);
    };

    //通过isbn获取信息
    base.search = function (q, tag, start, count) {
        return this._get('/v2/book/search', {q: q, tag: tag, start: (start || this.DEFAULT_START), count: (count || this.DEFAULT_COUNT)});
    };

    //获取图书标签
    base.tags = function (id) {
        return this._get('/v2/book/' + id + '/tags');
    };

    //获取用户标签
    base.tagged_list = function (user_id) {
        return this._get('/v2/book/user_tags/' + user_id);
    };

    base.review = {
        //发表一条书评
        'new': function (bookId, title, content) {
            return base._post('/v2/book/reviews', null, {book: bookId, title: title, content: content});
        },
        //更新一条书评
        'update': function (review_id, title, content) {
            return base._put('/v2/book/review/' + review_id, {title: title, content: content});
        },
        //删除一条书评
        'delete': function (review_id) {
            return base._delete('/v2/book/review/' + review_id);
        }
    };

    return base;
}

module.exports = Book;