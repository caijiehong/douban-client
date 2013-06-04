var session = require('../models/session');

var api = [
    {
        login: true,
        title: '当前用户Timeline',
        api: 'GET /shuo/v2/statuses/home_timeline',
        sdk: 'client.miniblog.home_timeline(count)',
        action: '/miniblog/home_timeline',
        params: [':count']
    },
    {
        title: '指定用户Timeline',
        api: 'GET /shuo/v2/statuses/user_timeline',
        sdk: 'client.miniblog.user_timeline(id, count)',
        action: '/miniblog/user_timeline',
        params: [':id', ':count']
    },
    {
        login: true,
        title: '@当前用户的广播',
        api: 'GET /shuo/v2/statuses/mentions',
        sdk: 'client.miniblog.mentions(count)',
        action: '/miniblog/mentions',
        params: [':count']
    },
    {
        title: '获取一条广播',
        api: 'GET /shuo/v2/statuses/:id',
        sdk: 'client.miniblog.get(count)',
        action: '/miniblog/get',
        params: [':id']
    },
    {
        login: true,
        title: '新写一条广播',
        api: 'POST /shuo/v2/statuses/',
        sdk: 'client.miniblog.new(text)',
        action: '/miniblog/new',
        params: [':text']
    },
    {
        login: true,
        title: '删除一条广播',
        api: 'DELETE /shuo/v2/statuses/:id',
        sdk: 'client.miniblog.delete(id)',
        action: '/miniblog/delete',
        params: [':id']
    },
    {
        login: true,
        title: '推荐网址',
        api: 'POST /shuo/v2/statuses/',
        sdk: "client.miniblog.rec(title, url, desc, image='')",
        action: '/miniblog/rec',
        params: [':title', ':url', ':desc']
    },
    {
        title: '获取某广播回复列表',
        api: 'GET /shuo/v2/statuses/:id/comments',
        sdk: 'client.miniblog.comments(id)',
        action: '/miniblog/comments',
        params: [':id']
    },
    {
        login: true,
        title: '回复某条广播',
        api: 'POST /shuo/v2/statuses/:id/comments',
        sdk: 'client.miniblog.comment.new(id, text)',
        action: '/miniblog/comment/new',
        params: [':id', ':text']
    },
    {
        title: '获取某条广播回复',
        api: 'GET /shuo/v2/statuses/comment/:comment_id',
        sdk: 'client.miniblog.comment.get(comment_id)',
        action: '/miniblog/comment/get',
        params: [':comment_id']
    },
    {
        login: true,
        title: '删除某条广播回复',
        api: 'DELETE /shuo/v2/statuses/comment/:comment_id',
        sdk: 'client.miniblog.comment.delete(comment_id)',
        action: '/miniblog/comment/delete',
        params: [':comment_id']
    },
    {
        login: true,
        title: '赞广播',
        api: 'POST /shuo/v2/statuses/:id/like',
        sdk: 'client.miniblog.like(id)',
        action: '/miniblog/like',
        params: [':id']
    },
    {
        login: true,
        title: '取消赞',
        api: 'DELETE /shuo/v2/statuses/:id/like',
        sdk: 'client.miniblog.unlike(id)',
        action: '/miniblog/unlike',
        params: [':id']
    },
    {
        title: '赞某广播用户列表',
        api: 'GET /shuo/v2/statuses/:id/like',
        sdk: 'client.miniblog.likers(id)',
        action: '/miniblog/likers',
        params: [':id']
    },
    {
        login: true,
        title: '转发广播',
        api: 'DELETE /shuo/v2/statuses/:id/reshare',
        sdk: 'client.miniblog.reshare(id)',
        action: '/miniblog/reshare',
        params: [':id']
    },
    {
        title: '转发某广播用户列表',
        api: 'GET /shuo/v2/statuses/:id/reshare',
        sdk: 'client.miniblog.resharers(id)',
        action: '/miniblog/resharers',
        params: [':id']
    }
];

exports.index = {
    get: function (req, res) {
        res.render('layout', {api: api, moduleName: 'miniblog'});
    }
};

exports.comment = {
    get: function (req, res, action) {
        var temp = session.get(req).getClient().miniblog.comment;

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