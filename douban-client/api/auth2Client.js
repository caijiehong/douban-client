var curl = require('curlrequest')
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

        var query = {
          'grant_type': 'authorization_code',
          'code': code,
          'client_id': _apiKey,
          'client_secret': _secret,
          'redirect_uri': redirectUrl
        }

        curl.request({
          url: 'https://' + _authHost + _tokenUrl,
          method: 'POST',
          data: query
        }, function(err, parts) {
            parts = parts.split('\r\n')
            var data = JSON.parse(parts.pop())

            if (err) {
                onauthed(err, null);
            } else {
                onauthed(null, data);
            }
        });
    };

    return this;
}

module.exports = Client;