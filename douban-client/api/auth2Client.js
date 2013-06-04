var https = require('https')
    , Access_token = require('./access_token')
    , url = require('url');

function Client(key, secret, authHost, apiHost, authorizeUrl, tokenUrl) {
    var _apiKey = key;
    var _secret = secret;
    var _authHost = authHost;
    var _apiHost = apiHost;
    var _authorizeUrl = authorizeUrl;
    var _tokenUrl = tokenUrl;

    this.authorize_url = function (redirectUri, scope) {
        return url.format(
            {
                protocol: 'https',
                host: _authHost,
                pathname: _authorizeUrl,
                query: {
                    client_id: _apiKey,
                    redirect_uri: redirectUri,
                    response_type: 'code',
                    scope: scope
                }});
    };

    this.get_token = function (code, redirectUrl, onauthed) {
        var query = {
            client_id: _apiKey,
            client_secret: _secret,
            redirect_uri: redirectUrl,
            grant_type: 'authorization_code',
            code: code
        };

        var options = {
            hostname: _authHost,
            path: url.format({pathname: _tokenUrl, query: query}),
            method: 'POST',
            headers: {
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

                var json = null;
                try {
                    json = JSON.parse(revData);
                } catch (err) {
                    onauthed(err, null);
                    return;
                }
                onauthed(null, json);
            });
        });
        req.on('error', function (e) {
            onauthed(e, null);
        });
        req.end();
    };

    return this;
}

module.exports = Client;