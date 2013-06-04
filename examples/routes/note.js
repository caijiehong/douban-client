var session = require('../models/session');

var api = [
    {
        title: '获取一篇日记',
        api: 'GET /v2/note/:id',
        sdk: 'client.note.get(id)',
        action: '/note/get',
        params: [':id']
    },
    {
        login: true,
        title: '新写一篇日记',
        api: 'POST /v2/notes',
        sdk: 'client.note.new(title, content, privacy = "public", can_reply = "true")',
        action: '/note/new',
        params: [':title', ':content']
    },
    {
        login: true,
        title: '更新一篇日记',
        api: 'PUT /v2/note/:id/',
        sdk: 'client.note.update(id, title, content, privacy = "public", can_reply = "true")',
        action: '/note/update',
        params: [':id', ':title', ':content']
    },
    {
        login: true,
        title: '删除一篇日记',
        api: 'DELETE /v2/note/:id',
        sdk: 'client.note.delete(id)',
        action: '/note/delete',
        params: [':id']
    },
    {
        login: true,
        title: '喜欢一篇日记',
        api: 'POST /v2/note/:id/like',
        sdk: 'client.note.like(id)',
        action: '/note/like',
        params: [':id']
    },
    {
        login: true,
        title: '取消喜欢一篇日记',
        api: 'DELETE /v2/note/:id/like',
        sdk: 'client.note.unlike(id)',
        action: '/note/unlike',
        params: [':id']
    },
    {
        title: '获取用户日记列表',
        api: 'GET /v2/note/user_created/:user_id',
        sdk: 'client.note.list(user_id)',
        action: '/note/list',
        params: [':user_id']
    },
    {
        title: '获取喜欢的日记列表',
        api: 'GET /v2/note/user_liked/:user_id',
        sdk: 'client.note.liked_list(user_id)',
        action: '/note/liked_list',
        params: [':user_id']
    },
    {
        title: '获取回复列表',
        api: 'GET /v2/note/:id/comments',
        sdk: 'client.note.comments(id)',
        action: '/note/comments',
        params: [':id']
    },
    {
        login: true,
        title: '新加一条回复',
        api: 'POST /v2/note/:id/comments',
        sdk: 'client.note.comment.new(id, text)',
        action: '/note/comment/new',
        params: [':id', ':text']
    },
    {
        title: '获取一条回复',
        api: 'GET /v2/note/:note_id/comment/:comment_id',
        sdk: 'client.note.comment.get(note_id, comment_id)',
        action: '/note/comment/get',
        params: [':id', ':comment_id']
    },
    {
        login: true,
        title: '删除一条回复',
        api: 'DELETE /v2/note/:note_id/comment/:comment_id',
        sdk: 'client.note.comment.delete(note_id, comment_id)',
        action: '/note/comment/delete',
        params: [':note_id', ':comment_id']
    }
];

exports.index = {
    get: function (req, res) {
        res.render('layout', {api: api, moduleName: 'note'});
    }
};

exports.comment = {
    get: function (req, res, action) {
        var temp = session.get(req).getClient().note.comment;

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