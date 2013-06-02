var session = require('../models/session.js')
    , settings = require('../settings');

exports.index = {
    get: function (req, res) {
        var api = [
            {
                login: true,
                title: '当前用户',
                desc: '获取当前授权用户信息',
                api: 'GET /v2/user/~me',
                sdk: 'client.user.me()',
                action: '/user/me',
                params: []
            },
            {
                title: '指定用户',
                desc: '获取用户信息',
                api: 'GET /v2/user/:name',
                sdk: 'client.user.get(id)',
                action: '/user/get',
                params: [':id']
            },
            {
                title: '搜索用户',
                desc: '搜索用户',
                api: 'GET /v2/user',
                sdk: 'client.user.search(q)',
                action: '/user/search',
                params: [':q']
            },
            {
                login: true,
                title: '关注用户',
                api: 'POST /shuo/v2/friendships/create',
                sdk: 'client.user.follow(id)',
                action: '/user/follow',
                params: [':id']
            },
            {
                login: true,
                title: '取消关注',
                api: 'POST /shuo/v2/friendships/destroy',
                sdk: 'client.user.unfollow(id)',
                action: '/user/unfollow',
                params: [':id']
            },
            {
                title: '粉丝信息',
                api: 'GET /shuo/v2/users/:id/followers',
                sdk: 'client.user.followers(id)',
                action: '/user/followers',
                params: [':id']
            },
            {
                title: '关注信息',
                api: 'GET /shuo/v2/users/:id/following',
                sdk: 'client.user.following(id)',
                action: '/user/following',
                params: [':id']
            },
            {
                title: '关注关系',
                api: 'GET /shuo/v2/friendships/show',
                sdk: 'client.user.friendships(target_id, source_id)',
                action: '/user/follow',
                params: [':target_id', ':source_id']
            },
            {
                login: true,
                title: '共同关注',
                api: 'GET /shuo/v2/users/:id/follow_in_common',
                sdk: 'client.user.follow_in_common(id)',
                action: '/user/follow_in_common',
                params: [':id']
            }
        ];
        res.render('user', {api: api});
    }
};