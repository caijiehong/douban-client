var session = require('../models/session.js');

exports.me = {
    get: function (req, res) {
        var client = session.get(req).getClient();
        client.user.me().once('data', function (err, data) {
            res.send(data);
        })
    }
};

exports.get = {
    get: function (req, res, userId) {
        var client = session.get(req).getClient();
        client.user.get(userId).once('data', function (err, data) {
            res.send(data);
        });
    }
};

exports.search = {
    get: function (req, res, username) {
        var client = session.get(req).getClient();
        client.user.search(username).once('data', function (err, data) {
            res.send(data);
        });
    }
};

exports.follow = {
    get: function (req, res, userId) {
        var client = session.get(req).getClient();
        client.user.follow(userId).once('data', function (err, data) {
            res.send(data);
        });
    }
};

exports.unfollow = {
    get: function (req, res, userId) {
        var client = session.get(req).getClient();
        client.user.unfollow(userId).once('data', function (err, data) {
            res.send(data);
        });
    }
};

exports.followers = {
    get: function (req, res, userId) {
        var client = session.get(req).getClient();
        client.user.followers(userId).once('data', function (err, data) {
            res.send(data);
        });
    }
};

exports.following = {
    get: function (req, res, userId) {
        var client = session.get(req).getClient();
        client.user.following(userId).once('data', function (err, data) {
            res.send(data);
        });
    }
};

exports.following = {
    get: function (req, res, userId) {
        var client = session.get(req).getClient();
        client.user.following(userId).once('data', function (err, data) {
            res.send(data);
        });
    }
};