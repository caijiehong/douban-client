var settings = require('../settings')
    , DoubanClient = require('../../index');

var clientInSession = {};

var sessionConstructed = false;

exports.get = function (req) {
    var ses = req.session;

    if (!sessionConstructed) {
        var cst = ses.constructor;

        cst.prototype.clear = function () {
            delete clientInSession[this.id];
            delete this.doubanToken;
        };

        cst.prototype.getClient = function () {
            var client = clientInSession[this.id];
            if (!client) {
                var redirect_uri = 'http://' + settings.hostname + '/home/doubanback';
                client = new DoubanClient(settings.doubanApiKey, settings.doubanSecret, redirect_uri, settings.scopes.join(','));
                clientInSession[this.id] = client;

                if (this.doubanToken) {
                    client.loadFromDoubanToken(this.doubanToken);
                }
            }
            return client;
        };

        cst.prototype.setDoubanToken = function (doubanToken) {
            this.doubanToken = doubanToken;
        }

        cst.prototype.checkVerifyCode = function (code) {
            if (!this._verifyCode || this._verifyCode != code.toLowerCase()) {
                this._verifyCode = null;
                return false
            } else {
                return true;
            }
        };
        cst.prototype.setVerifyCode = function (code) {
            this._verifyCode = code.toLowerCase();
        };
        sessionConstructed = true;
    }

    return ses;
}