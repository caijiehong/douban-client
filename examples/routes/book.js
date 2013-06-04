var session = require('../models/session');

var api = [
    {
        title: '获取一本图书信息',
        api: 'GET /v2/book/:id',
        sdk: 'client.book.get(id)',
        action: '/book/get',
        params: [':id']
    },
    {
        title: '通过isbn获取信息',
        api: 'GET /v2/book/isbn/:name',
        sdk: 'client.book.isbn(isbn_number)',
        action: '/book/isbn',
        params: [':isbn_number']
    },
    {
        title: '搜索图书信息',
        api: 'GET /v2/book/search',
        sdk: 'client.book.search(q, tag, start, count)',
        action: '/book/search',
        params: [':q', ':tag']
    },
    {
        title: '获取图书标签',
        api: 'GET /v2/book/:id/tags',
        sdk: 'client.book.tags(id)',
        action: '/book/search',
        params: [':id']
    },
    {
        title: '获取用户标签',
        api: 'GET /v2/book/user/:id/tags',
        sdk: 'client.book.tagged_list(user_id)',
        action: '/book/search',
        params: [':user_id']
    },
    {
        login: true,
        title: '发表一条书评',
        api: 'POST /v2/book/reviews',
        sdk: 'client.book.review.new(id, title, content)',
        action: '/album/new',
        params: [':title', ':desc']
    },
    {
        login: true,
        title: '更新一条书评',
        api: 'PUT /v2/book/review/:id',
        sdk: 'client.book.review.update(review_id, title, content)',
        action: '/album/update',
        params: [':id', ':title', ':desc']
    },
    {
        login: true,
        title: '删除一条书评',
        api: 'DELETE /v2/book/review/:id',
        sdk: 'client.book.review.delete(review_id)',
        action: '/album/delete',
        params: [':id']
    }
];

exports.index = {
    get: function (req, res) {
        res.render('layout', {api: api, moduleName: 'book'});
    }
};

exports.comment = {
    get: function (req, res, action) {
        var temp = session.get(req).getClient().book.review;

        var params = [];
        for (var i = 0; i < 6; i++) {
            var value = req.body['p' + i];
            if (value == undefined)break;
            params[i] = value;
        }

        temp[action].apply(temp, params).once('data', function (err, data) {
            res.send(data);
        });
    }
};