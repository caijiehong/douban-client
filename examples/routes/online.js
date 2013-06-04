var session = require('../models/session');

var api = [
    {
        title: '获取一条线上活动',
        api: 'GET /v2/online/:id',
        sdk: 'client.online.get(id)',
        action: '/online/get',
        params: [':id']
    },
    {
        login: true,
        title: '发表一条线上活动',
        api: 'POST /v2/onlines',
        sdk: 'client.online.new(title, desc, begin_time, end_time)',
        action: '/online/new',
        params: [':title', ':desc', ':begin_time', 'end_time']
    },
    {
        login: true,
        title: '更新一条线上活动',
        api: 'PUT /v2/online/:id/',
        sdk: 'client.online.update(title, desc, begin_time, end_time)',
        action: '/online/update',
        params: [':title', ':desc', ':begin_time', 'end_time']
    },
    {
        login: true,
        title: '删除一条线上活动',
        api: 'DELETE /v2/online/:id',
        sdk: 'client.online.delete(id)',
        action: '/online/delete',
        params: [':id']
    },
    {
        login: true,
        title: '参加一条线上活动',
        api: 'POST /v2/onlines/:id/participants',
        sdk: 'client.online.join(id)',
        action: '/online/join',
        params: [':id']
    },
    {
        login: true,
        title: '取消参加线上活动',
        api: 'DELETE /v2/onlines/:id/participants',
        sdk: 'client.online.quit(id)',
        action: '/online/quit',
        params: [':id']
    },
    {
        login: true,
        title: '喜欢一条线上活动',
        api: 'POST /v2/onlines/:id/like',
        sdk: 'client.online.like(id)',
        action: '/online/like',
        params: [':id']
    },
    {
        login: true,
        title: '取消喜欢线上活动',
        api: 'DELETE /v2/onlines/:id/like',
        sdk: 'client.online.unlike(id)',
        action: '/online/unlike',
        params: [':id']
    },
    {
        title: '获取线上活动图片',
        api: 'GET /v2/online/:id/photos',
        sdk: 'client.online.photos(id, start, count)',
        action: '/online/photos',
        params: [':id']
    },
    {
        title: '上传图片到线上活动',
        api: 'POST /v2/online/:id/photos',
        sdk: 'client.online.upload(id, image)',
        action: '/online/upload',
        params: [':id', ':image']
    },
    {
        title: '获取线上活动讨论',
        api: 'GET /v2/online/:id/discussions',
        sdk: 'client.online.discussions(id, start, count)',
        action: '/online/discussions',
        params: [':id']
    },
    {
        login: true,
        title: '线上活动新发讨论',
        api: 'POST /v2/online/:id/discussions',
        sdk: 'client.online.discussions.new(id, title, content)',
        action: '/online/discussions/new',
        params: [':id', ':title', ':content']
    },
    {
        title: '线上活动参加者',
        api: 'GET /v2/online/:id/participants',
        sdk: 'client.online.participants(id, start, count)',
        action: '/online/participants',
        params: [':id']
    },
    {
        title: '获取线上活动列表',
        api: 'GET /v2/onlines',
        sdk: 'client.online.list(cate, start, count)',
        action: '/online/list',
        params: [':cate']
    },
    {
        title: '获取创建过的活动',
        api: 'GET /v2/online/user_created/:user_id',
        sdk: 'client.online.created(user_id, start, count)',
        action: '/online/created',
        params: [':user_id']
    },
    {
        title: '获取参加过的活动',
        api: 'GET /v2/online/user_participated/:user_id',
        sdk: 'client.online.participated(user_id, start, count)',
        action: '/online/participated',
        params: [':user_id']
    }
];

exports.index = {
    get: function (req, res) {
        res.render('layout', {api: api, moduleName: 'online'});
    }
};

exports.comment = {
    get: function (req, res, action) {
        var temp = session.get(req).getClient().online.comment;

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