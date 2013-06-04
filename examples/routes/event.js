var session = require('../models/session');

var api = [
    {
        title: '获取同城活动',
        api: 'GET /v2/event/:id',
        sdk: 'client.event.get(id)',
        action: '/event/get',
        params: [':id']
    },
    {
        title: '搜索同城活动',
        api: 'GET /v2/event/search',
        sdk: 'client.event.search(q, loc, start, count)',
        action: '/event/search',
        params: [':q', ':loc']
    },
    {
        login: true,
        title: '参加同城活动',
        api: 'POST /v2/events/:id/participants',
        sdk: 'client.event.join(id)',
        action: '/event/join',
        params: [':id']
    },
    {
        login: true,
        title: '取消参加同城活动',
        api: 'DELETE /v2/events/:id/participants',
        sdk: 'client.event.quit(id)',
        action: '/event/quit',
        params: [':id']
    },
    {
        login: true,
        title: '对同城活动感兴趣',
        api: 'POST /v2/events/:id/wishers',
        sdk: 'client.event.wish(id)',
        action: '/event/wish',
        params: [':id']
    },
    {
        login: true,
        title: '取消同城活动兴趣',
        api: 'DELETE /v2/events/:id/wishers',
        sdk: 'client.event.unwish(id)',
        action: '/event/unwish',
        params: [':id']
    },
    {
        title: '某同城活动参加者',
        api: 'GET /v2/event/:id/participants',
        sdk: 'client.event.participants(id, start, count)',
        action: '/event/participants',
        params: [':id']
    },
    {
        title: '某同城活动感兴趣者',
        api: 'GET /v2/event/:id/wishers',
        sdk: 'client.event.wishers(id, start, count)',
        action: '/event/wishers',
        params: [':id']
    },
    {
        title: '获取用户创建过的同城活动',
        api: 'GET /v2/event/user_created/:user_id',
        sdk: 'client.event.owned(user_id, start, count)',
        action: '/event/owned',
        params: [':user_id']
    },
    {
        title: '获取用户参加过的同城活动',
        api: 'GET /v2/event/user_participated/:user_id',
        sdk: 'client.event.participated(user_id, start, count)',
        action: '/event/participated',
        params: [':user_id']
    },
    {
        title: '获取用户感兴趣的同城活动',
        api: 'GET /v2/event/user_wished/:user_id',
        sdk: 'client.event.wished(user_id, start, count)',
        action: '/event/wished',
        params: [':user_id']
    }
];

exports.index = {
    get: function (req, res) {
        res.render('layout', {api: api, moduleName: 'event'});
    }
};

exports.comment = {
    get: function (req, res, action) {
        var temp = session.get(req).getClient().event.comment;

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