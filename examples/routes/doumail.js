var api = [
    {
        login: true,
        title: '获取一封豆邮',
        api: 'GET /v2/doumail/:id',
        sdk: 'client.doumail.get()',
        action: '/doumail/get',
        params: [':id']
    },
    {
        login: true,
        title: '新写一封豆邮',
        api: 'GET /shuo/v2/doumails',
        sdk: 'client.doumail.new(title, content, receiver_id)',
        action: '/doumail/new',
        params: [':title', ':content', ':receiver_id']
    },
    {
        login: true,
        title: '标记一封豆邮',
        api: 'PUT /v2/doumail/:id',
        sdk: 'client.doumail.read()',
        action: '/doumail/read',
        params: [':id']
    },
    {
        login: true,
        title: '批量标记豆邮',
        api: 'PUT /v2/doumail/read',
        sdk: 'client.doumail.reads(ids)',
        action: '/doumail/reads',
        params: [':ids']
    },
    {
        login: true,
        title: '删除一封豆邮',
        api: 'DELETE /v2/doumail/:id',
        sdk: 'client.doumail.delete(id)',
        action: '/doumail/delete',
        params: [':id']
    },
    {
        login: true,
        title: '批量删除豆邮',
        api: 'DELETE /v2/doumail/deletes',
        sdk: 'client.doumail.deletes(ids)',
        action: '/doumail/reads',
        params: [':ids']
    },
    {
        login: true,
        title: '豆邮收件箱列表',
        api: 'GET /v2/doumail/inbox',
        sdk: 'client.doumail.inbox(start, count)',
        action: '/doumail/inbox',
        params: [':start', ':count']
    },
    {
        login: true,
        title: '豆邮发件箱列表',
        api: 'GET /v2/doumail/outbox',
        sdk: 'client.doumail.outbox(start, count)',
        action: '/doumail/outbox',
        params: [':start', ':count']
    },
    {
        login: true,
        title: '未读豆邮列表',
        api: 'GET /v2/doumail/unread',
        sdk: 'client.doumail.unread(start, count)',
        action: '/doumail/unread',
        params: [':start', ':count']
    }
];

exports.index = {
    get: function (req, res) {
        res.render('layout', {api: api, moduleName: 'doumail'});
    }
};