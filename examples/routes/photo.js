var session = require('../models/session');

var api = [
    {
        title: '获取一张图片',
        api: 'GET /v2/photo/:id',
        sdk: 'client.photo.get(id)',
        action: '/photo/get',
        params: [':id']
    },
    {
        login: true,
        title: '上传一张图片',
        api: 'POST /v2/photos',
        sdk: 'client.photo.new(desc, image)',
        action: '/photo/new',
        params: [':desc', ':image']
    },
    {
        login: true,
        title: '更新一张图片',
        api: 'PUT /v2/photo/:id/',
        sdk: 'client.photo.update(id, desc)',
        action: '/photo/update',
        params: [':desc']
    },
    {
        login: true,
        title: '删除一张图片',
        api: 'DELETE /v2/photo/:id',
        sdk: 'client.photo.delete(id)',
        action: '/photo/delete',
        params: [':id']
    },
    {
        login: true,
        title: '喜欢一张图片',
        api: 'POST /v2/photo/:id/like',
        sdk: 'client.photo.like(id)',
        action: '/photo/like',
        params: [':id']
    },
    {
        login: true,
        title: '取消喜欢一张图片',
        api: 'DELETE /v2/photo/:id/like',
        sdk: 'client.photo.unlike(id)',
        action: '/photo/unlike',
        params: [':id']
    },
    {
        title: '获取回复列表',
        api: 'GET /v2/photo/:id/comments',
        sdk: 'client.photo.comments(id)',
        action: '/photo/comments',
        params: [':id']
    },
    {
        login: true,
        title: '新加一条回复',
        api: 'POST /v2/photo/:id/comments',
        sdk: 'client.photo.comment.new(id, text)',
        action: '/photo/comment/new',
        params: [':id', ':text']
    },
    {
        title: '获取一条回复',
        api: 'GET /v2/photo/:photo_id/comment/:comment_id',
        sdk: 'client.photo.comment.get(photo_id, comment_id)',
        action: '/photo/comment/get',
        params: [':id', ':comment_id']
    },
    {
        login: true,
        title: '删除一条回复',
        api: 'DELETE /v2/photo/:photo_id/comment/:comment_id',
        sdk: 'client.photo.comment.delete(photo_id, comment_id)',
        action: '/photo/comment/delete',
        params: [':photo_id', ':comment_id']
    }
];

exports.index = {
    get: function (req, res) {
        res.render('layout', {api: api, moduleName: 'photo'});
    }
};

exports.comment = {
    get: function (req, res, action) {
        var temp = session.get(req).getClient().photo.comment;

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