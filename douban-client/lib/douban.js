var Client = require('./api/auth2Client')
    , Access_token = require('./api/access_token')
    , User = require('./api/user');

var API_HOST = 'api.douban.com';
var AUTH_HOST = 'www.douban.com';
var TOKEN_URL = '/service/auth2/token';
var AUTHORIZE_URL = '/service/auth2/auth';

function DoubanClient(key, secrect, redirect_uri, scope) {
    var _apiKey = key;
    var _redirectUri = redirect_uri;
    var _scope = scope;
    var client = new Client(key, secrect, AUTH_HOST, API_HOST, AUTHORIZE_URL, TOKEN_URL);
    var access_token = null;
    this.user = null;
    var _this = this;
    this.doubanToken = null;

    this.authorize_url = function (redirectUri, scope) {
        return client.authorize_url(redirectUri || _redirectUri, scope || _scope);
    };

    this.auth_with_code = function (code, onauthed) {
        client.get_token(code, _redirectUri, function (err, res) {
            console.log('doubanToken', res);
            loadFromDoubanToken(res);
            onauthed(err, res);
        });
    };

    this.auth_with_token = function (token, onauthed) {
    };

    this.token_code = function () {
        return access_token && access_token.token;
    };

    this.refresh_token = function () {

    };

    this.loadFromDoubanToken = loadFromDoubanToken = function (doubanToken, token, expires, refreshToken, userId, username) {
        _this.doubanToken = doubanToken;
        access_token = new Access_token(doubanToken.access_token, doubanToken.expires_in, doubanToken.refresh_token);
        _this.user = new User(access_token, _apiKey);
    }

    return this;
};

DoubanClient.prototype.authorize_url = function (redirectUri, scope) {
    return client.authorize_url(redirectUri || _redirectUri, scope || _scope);
};

module.exports = DoubanClient;