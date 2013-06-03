var https = require('https')
    , http = require('http')
    , url = require('url')
    , querystring = require('querystring');


function Access_token(token, expires, refreshToken) {
    this.token = token;
    this.expires = expires;
    this.refreshToken = refreshToken;

    return this;
}

Access_token.prototype.get = function (hostname, path, query, onrecieve) {
    var options = {
        hostname: hostname,
        path: url.format({pathname: path, query: query}),
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': "application/x-www-form-urlencoded",
            'content-length': 0
        }
    };

    var revData = '';
    var req = https.request(options, function (res) {
        res.on('data', function (d) {
            revData += d.toString('utf8');
        });
        res.on('end', function () {
            onrecieve(null, revData);
        });
    });
    req.on('error', function (e) {
        onrecieve(e, null);
    });

    req.end();
};

Access_token.prototype.post = function (hostname, path, query, postdata, onrecieve) {

    var post = querystring.stringify(postdata);

    var options = {
        hostname: hostname,
        path: url.format({pathname: path, query: query}),
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': "application/x-www-form-urlencoded",
            'content-length': Buffer.byteLength(post)
        }
    };
    var revData = '';
    var req = https.request(options, function (res) {
        res.on('data', function (d) {
            revData += d.toString('utf8');
        });
        res.on('end', function () {
            onrecieve(null, revData);
        });
    });
    req.on('error', function (e) {
        onrecieve(e, null);
    });

    req.write(post);
    req.end();
};

Access_token.prototype.delete = function (hostname, path, query, onrecieve) {
    var options = {
        hostname: hostname,
        path: url.format({pathname: path, query: query}),
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': "application/x-www-form-urlencoded",
            'content-length': 0
        }
    };

    var revData = '';
    var req = https.request(options, function (res) {
        res.on('data', function (d) {
            revData += d.toString('utf8');
        });
        res.on('end', function () {
            onrecieve(null, revData);
        });
    });
    req.on('error', function (e) {
        onrecieve(e, null);
    });

    req.end();

}

Access_token.prototype.put = function (hostname, path, query, postdata, onrecieve) {
    var post = querystring.stringify(postdata);

    var options = {
        hostname: hostname,
        path: url.format({pathname: path, query: query}),
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': "application/x-www-form-urlencoded",
            'content-length': Buffer.byteLength(post)
        }
    };

    var revData = '';
    var req = https.request(options, function (res) {
        res.on('data', function (d) {
            revData += d.toString('utf8');
        });
        res.on('end', function () {
            onrecieve(null, revData);
        });
    });
    req.on('error', function (e) {
        onrecieve(e, null);
    });

    req.write(post);
    req.end();
}

module.exports = Access_token;