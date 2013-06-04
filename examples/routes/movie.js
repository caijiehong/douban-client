var session = require('../models/session');

var api = [
    {
        title: '获取一部电影信息',
        api: 'GET /v2/movie/:id',
        sdk: 'client.movie.get(id)',
        action: '/movie/get',
        params: [':id']
    },
    {
        title: '通过imdb获取电影',
        api: 'GET /v2/movie/imdb/:imdb_number',
        sdk: 'client.movie.imdb(imdb_number)',
        action: '/movie/imdb',
        params: [':imdb_number']
    },
    {
        title: '搜索图书信息',
        api: 'GET /v2/movie/search',
        sdk: 'client.movie.search(q, tag, start, count)',
        action: '/movie/search',
        params: [':q', ':tag']
    },
    {
        title: '获取影人信息',
        api: 'GET /v2/movie/celebrity/:id',
        sdk: 'client.movie.celebrity(celebrity_id)',
        action: '/movie/celebrity',
        params: [':celebrity_id']
    },
    {
        title: '获取影人作品信息',
        api: 'GET /v2/movie/celebrity/:id/works',
        sdk: 'client.movie.celebrity_works(celebrity_id)',
        action: '/movie/celebrity_works',
        params: [':celebrity_id']
    },
    {
        title: '获取电影标签',
        api: 'GET /v2/movie/:id/tags',
        sdk: 'client.movie.tags(id)',
        action: '/movie/search',
        params: [':id']
    },
    {
        title: '获取用户标签',
        api: 'GET /v2/movie/user/:user_id/tags',
        sdk: 'client.movie.tagged_list(user_id)',
        action: '/movie/search',
        params: [':user_id']
    },
    {
        login: true,
        title: '发表一条影评',
        api: 'POST /v2/movie/reviews',
        sdk: 'client.movie.review.new(id, title, content)',
        action: '/album/new',
        params: [':title', ':desc']
    },
    {
        login: true,
        title: '更新一条影评',
        api: 'PUT /v2/movie/review/:id',
        sdk: 'client.movie.review.update(review_id, title, content)',
        action: '/album/update',
        params: [':id', ':title', ':desc']
    },
    {
        login: true,
        title: '删除一条影评',
        api: 'DELETE /v2/movie/review/:id',
        sdk: 'client.movie.review.delete(review_id)',
        action: '/album/delete',
        params: [':id']
    }
];

exports.index = {
    get: function (req, res) {
        res.render('layout', {api: api, moduleName: 'movie'});
    }
};

exports.comment = {
    get: function (req, res, action) {
        var temp = session.get(req).getClient().movie.review;

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