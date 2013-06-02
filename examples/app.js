var express = require('express')
    , path = require('path')
    , MongoStore = require('connect-mongo')(express)
    , session = require('./models/session');

var settings = require('./settings.js');
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
    app.use(express.session({
        secret: settings.cookie_secret,
        store: new MongoStore({
            url: settings.dbUrl,
            cookie: {  path: '/', maxAge: 60000000 * 5 }
        })
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.logger('dev'));
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler());
    app.locals.pretty = true;
});


function urlRouter(req, res, controller, action, id, ispost) {
    res.locals.doubanClient = session.get(req).getClient();

    controller = controller || 'home';
    action = action || 'index';

    var ctr = controllers[controller]

    try {
        if (!ctr) {
            ctr = controllers[controller] = require('./routes/' + controller);
        }

        if (ctr[action].needLogin && !req.session.user) {
            res.redirect('/home/login');
        } else if (ispost) {
            ctr[action].post(req, res, id);
        } else {
            ctr[action].get(req, res, id);
        }
    } catch (err) {
        console.error(err.stack);
        res.status(404);
        res.render('layout', {error: err.stack});
    }

    res.locals.title = res.locals.title || 'douban sdk by caijiehong';
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

    server.listen(3000);
}
