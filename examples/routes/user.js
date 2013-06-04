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
        api: 'GET /v2/user/:user_id',
        sdk: 'client.user.get(user_id)',
        action: '/user/get',
        params: [':user_id']
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
        sdk: 'client.user.follow(user_id)',
        action: '/user/follow',
        params: [':user_id']
    },
    {
        login: true,
        title: '取消关注',
        api: 'POST /shuo/v2/friendships/destroy',
        sdk: 'client.user.unfollow(user_id)',
        action: '/user/unfollow',
        params: [':user_id']
    },
    {
        title: '粉丝信息',
        api: 'GET /shuo/v2/users/:user_id/followers',
        sdk: 'client.user.followers(user_id)',
        action: '/user/followers',
        params: [':user_id']
    },
    {
        title: '关注信息',
        api: 'GET /shuo/v2/users/:user_id/following',
        sdk: 'client.user.following(user_id)',
        action: '/user/following',
        params: [':user_id']
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
        api: 'GET /shuo/v2/users/:user_id/follow_in_common',
        sdk: 'client.user.follow_in_common(user_id)',
        action: '/user/follow_in_common',
        params: [':user_id']
    }
];

exports.index = {
    get: function (req, res) {
        res.render('layout', {api: api, moduleName: 'user'});
    }
};