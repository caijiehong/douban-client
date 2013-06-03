var session = require('../models/session');

var api = [
    {
        title: '获取一个相册',
        api: 'GET /v2/album/:id',
        sdk: 'client.album.get(id)',
        action: '/album/get',
        params: [':id']
    },
    {
        login: true,
        title: '新建一个相册',
        api: 'POST /v2/albums',
        sdk: 'client.album.new(title, desc, order="desc", privacy="public")',
        action: '/album/new',
        params: [':title', ':desc']
    },
    {
        login: true,
        title: '更新一个相册',
        api: 'PUT /v2/album/:id/',
        sdk: 'client.album.update(id, title, desc, order="desc", privacy="public")',
        action: '/album/update',
        params: [':id', ':title', ':desc']
    },
    {
        login: true,
        title: '删除一个相册',
        api: 'DELETE /v2/album/:id',
        sdk: 'client.album.delete(id)',
        action: '/album/delete',
        params: [':id']
    },
    {
        login: true,
        title: '喜欢一个相册',
        api: 'POST /v2/album/:id/like',
        sdk: 'client.album.like(id)',
        action: '/album/like',
        params: [':id']
    },
    {
        login: true,
        title: '取消喜欢一个相册',
        api: 'DELETE /v2/album/:id/like',
        sdk: 'client.album.unlike(id)',
        action: '/album/unlike',
        params: [':id']
    },
    {
        title: '获取用户相册列表',
        api: 'GET /v2/album/user_created/:id',
        sdk: 'client.album.list(id)',
        action: '/album/list',
        params: [':id']
    },
    {
        title: '获取喜欢的相册列表',
        api: 'GET /v2/album/user_liked/:id',
        sdk: 'client.album.liked_list(id)',
        action: '/album/liked_list',
        params: [':id']
    },
    {
        title: '获取相册图片列表',
        api: 'GET /v2/album/:id/photos',
        sdk: "client.album.photos(id, start=DEFAULT_START, count=DEFAULT_COUNT, order='', sortby='time')",
        action: '/album/photos',
        params: [':id']
    }
];

exports.index = {
    get: function (req, res) {
        res.render('layout', {api: api, moduleName: 'album'});
    }
};

exports.comment = {
    get: function (req, res, action) {
        var temp = session.get(req).getClient().album.comment;

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