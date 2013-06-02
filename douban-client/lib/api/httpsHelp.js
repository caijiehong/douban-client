var https = require('https')
    , url = require('url');

var httpsHelp = {
    post: function (hostname, path, query, postData, onEnd) {
        var options = {
            hostname: hostname,
            path: url.format({pathname: path, query: query}),
            method: 'POST',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'content-length': postData ? Buffer.byteLength(postData) : 0
            }
        };

        var revData = '';
        var req = https.request(options,function (res) {
            res.on('data', function (d) {
                revData += d.toString('utf8');
            })
                .on('end', function () {

                    onEnd(null, revData);
                });
        }).on('error', function (e) {
                onEnd(e, null);
            });

        if (postData) {
            req.end(postData);
        } else {
            req.end();
        }
    },
    get: function (hostname, path, query, onEnd) {
        var options = {
            hostname: hostname,
            path: url.format({pathname: path, query: query}),
            method: 'GET',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'content-length': 0
            }
        };
        var revData = '';
        var req = https.request(options,function (res) {
            res.on('data', function (d) {
                revData += d.toString('utf8');
            })
                .on('end', function () {
                    onEnd(null, revData);
                });
        }).on('error', function (e) {
                onEnd(e, null);
            });

        req.end();
    }
};

module.exports = httpsHelp;