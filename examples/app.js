var express = require('express')
    , path = require('path')
    , session = require('./models/session')
    , settings = require('./settings.js')
    , Db = require('mongodb').Db;
var controllers = {};

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    var MongoStore = require(settings.onBaidu ? 'connect-memcache' : 'connect-mongo')(express);

    app.use(express.session({
        secret: settings.cookie_secret,
        store: new MongoStore({
            url: settings.dbUrl
        })
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.logger('dev'));
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler());
    //app.locals.pretty = true;
});


function urlRouter(req, res, controller, action, id, ispost) {
    var ses = session.get(req);
    res.locals.doubanToken = ses.doubanToken;
    res.locals.authorize_url = ses.getClient().authorize_url();
    res.locals.testUserId1 = settings.testUserId1;
    res.locals.testUsername1 = settings.testUsername1;
    res.locals.testUserId2 = settings.testUserId2;
    res.locals.testUsername2 = settings.testUsername2
    res.locals.loginUserId = ses.doubanToken ? ses.doubanToken.douban_user_id : '';

    res.locals.title = res.locals.title || 'douban sdk';

    controller = controller || 'home';
    action = action || 'index';

    var ctr = controllers[controller]

    try {
        if (!ctr) {
            ctr = controllers[controller] = require('./routes/' + controller);
        }

        if (ctr[action]) {
            if (ispost) {
                ctr[action].post(req, res, id);
            } else {
                ctr[action].get(req, res, id);
            }
        } else {
            console.log('start', req.url);
            var client = session.get(req).getClient();

            if (client[controller] && client[controller][action]) {

                var temp = client[controller];
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
        }
    } catch (err) {
        console.error(err.stack);
        res.status(404);
        res.render('layout', {error: err.stack});
    }
}

app.get('/', function (req, res) {
    urlRouter(req, res, 'home', 'index');
});

app.get('/:controller/:action?/:id?', function (req, res) {
    urlRouter(req, res, req.params.controller, req.params.action, req.params.id, false);
});

app.post('/:controller/:action?/:id?', function (req, res) {
    urlRouter(req, res, req.params.controller, req.params.action, req.params.id, true);
});


exports.start = function () {

    var server = require('http').createServer(app);

    server.listen(settings.serverPort);
    console.log('server is listening at ' + settings.serverPort);
}
