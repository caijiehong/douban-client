var session = require('../models/session');

var api = [
    {
        title: '获取一部音乐信息',
        api: 'GET /v2/music/:id',
        sdk: 'client.music.get(id)',
        action: '/music/get',
        params: [':id']
    },
    {
        title: '搜索图书信息',
        api: 'GET /v2/music/search',
        sdk: 'client.music.search(q, tag, start, count)',
        action: '/music/search',
        params: [':q', ':tag']
    },
    {
        title: '获取音乐标签',
        api: 'GET /v2/music/:id/tags',
        sdk: 'client.music.tags(id)',
        action: '/music/search',
        params: [':id']
    },
    {
        title: '获取用户标签',
        api: 'GET /v2/music/user/:user_id/tags',
        sdk: 'client.music.tagged_list(user_id)',
        action: '/music/search',
        params: [':user_id']
    },
    {
        login: true,
        title: '发表一条乐评',
        api: 'POST /v2/music/reviews',
        sdk: 'client.music.review.new(id, title, content)',
        action: '/album/new',
        params: [':title', ':desc']
    },
    {
        login: true,
        title: '更新一条乐评',
        api: 'PUT /v2/music/review/:id',
        sdk: 'client.music.review.update(review_id, title, content)',
        action: '/album/update',
        params: [':id', ':title', ':desc']
    },
    {
        login: true,
        title: '删除一条乐评',
        api: 'DELETE /v2/music/review/:id',
        sdk: 'client.music.review.delete(review_id)',
        action: '/album/delete',
        params: [':id']
    }
];

exports.index = {
    get: function (req, res) {
        res.render('layout', {api: api, moduleName: 'music'});
    }
};

exports.comment = {
    get: function (req, res, action) {
        var temp = session.get(req).getClient().music.review;

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