var Client = require('./api/auth2Client')
    , Access_token = require('./api/access_token');

var API_HOST = 'api.douban.com';
var AUTH_HOST = 'www.douban.com';
var TOKEN_URL = '/service/auth2/token';
var AUTHORIZE_URL = '/service/auth2/auth';

function DoubanClient(key, secrect, redirect_uri, scope) {
    var _apiKey = key;
    var _redirectUri = redirect_uri;
    var _scope = scope;
    var client = new Client(key, secrect, AUTH_HOST, API_HOST, AUTHORIZE_URL, TOKEN_URL);
    var access_token = new Access_token('', 0, '');;
    var _this = this;
    this.doubanToken = null;

    setup();

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
        this.doubanToken = doubanToken;
        access_token = new Access_token(doubanToken.access_token, doubanToken.expires_in, doubanToken.refresh_token);

        setup();
    };

    function setup(){
        var base = new require('./api/base')(access_token, _apiKey);
        _this.album = new require('./api/album')(base);
        _this.book = new require('./api/book')(base);
        _this.discussion = new require('./api/discussion')(base);
        _this.doumail = new require('./api/doumail')(base);
        _this.event = new require('./api/event')(base);
        _this.miniblog = new require('./api/miniblog')(base);
        _this.movie = new require('./api/movie')(base);
        _this.music = new require('./api/music')(base);
        _this.note = new require('./api/note')(base);
        _this.online = new require('./api/online')(base);
        _this.photo = new require('./api/photo')(base);
        _this.user = new require('./api/user')(base);
    }

    return this;
};

DoubanClient.prototype.authorize_url = function (redirectUri, scope) {
    return client.authorize_url(redirectUri || _redirectUri, scope || _scope);
};

module.exports = DoubanClient;