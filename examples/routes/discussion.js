var session = require('../models/session');

var api = [
    {
        title: '获取帖子',
        api: 'GET /v2/discussion/:id',
        sdk: 'client.discussion.get(id)',
        action: '/discussion/get',
        params: [':id']
    },
    {
        login: true,
        title: '发表帖子',
        api: 'POST /v2/discussions',
        sdk: 'client.discussion.new(target, target_id, title, content)',
        action: '/discussion/new',
        params: [':target', ':target_id', ':title', 'content']
    },
    {
        login: true,
        title: '更新帖子',
        api: 'PUT /v2/discussion/:id/',
        sdk: 'client.discussion.update(id, title, content)',
        action: '/discussion/update',
        params: [':id', ':title', ':content']
    },
    {
        login: true,
        title: '删除帖子',
        api: 'DELETE /v2/discussion/:id',
        sdk: 'client.discussion.delete(id)',
        action: '/discussion/delete',
        params: [':id']
    },
    {
        title: '获取帖子列表',
        api: 'GET /v2/:target/:target_id/discussions',
        sdk: 'client.discussion.list(target, target_id)',
        action: '/discussion/list',
        params: [':target', ':target_id']
    },
    {
        title: '获取喜欢的日记列表',
        api: 'GET /v2/discussion/user_liked/:id',
        sdk: 'client.discussion.liked_list(id)',
        action: '/discussion/liked_list',
        params: [':id']
    },
    {
        title: '获取回复列表',
        api: 'GET /v2/discussion/:id/comments',
        sdk: 'client.discussion.comments(id)',
        action: '/discussion/comments',
        params: [':id']
    },
    {
        login: true,
        title: '新加一条回复',
        api: 'POST /v2/discussion/:id/comments',
        sdk: 'client.discussion.comment.new(id, text)',
        action: '/discussion/comment/new',
        params: [':id', ':text']
    },
    {
        title: '获取一条回复',
        api: 'GET /v2/discussion/:discussion_id/comment/:comment_id',
        sdk: 'client.discussion.comment.get(discussion_id, comment_id)',
        action: '/discussion/comment/get',
        params: [':id', ':comment_id']
    },
    {
        login: true,
        title: '删除一条回复',
        api: 'DELETE /v2/discussion/:discussion_id/comment/:comment_id',
        sdk: 'client.discussion.comment.delete(discussion_id, comment_id)',
        action: '/discussion/comment/delete',
        params: [':discussion_id', ':comment_id']
    }
];

exports.index = {
    get: function (req, res) {
        res.render('layout', {api: api, moduleName: 'discussion'});
    }
};

exports.comment = {
    get: function (req, res, action) {
        var temp = session.get(req).getClient().discussion.comment;

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