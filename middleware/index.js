module.exports = function (app, express) {
    let favicon = require('serve-favicon'),
        path = require('path'),
        session = require('express-session'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        helmet = require('helmet'),
        i18n = require('i18n-2');

    /* Helmet */
    app.use(helmet());

    /**
     * Page Rendering
     * */
    app.set('view engine', 'pug');

    /**
     * Favicon
     * */
    app.use(favicon(path.join(__dirname, '../public/images', 'favicon.ico')));

    /**
     * Public directory
     * */
    app.use(express.static(path.join(__dirname, "../public")));

    /**
     * Cookie and Session
     */
    app.use(cookieParser("poland_site"));

    app.use(session({
        secret: "poland_site",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    }));

    /**
     * Internazionalization
     */
    i18n.expressBind(app, {
        locales: ['ru', 'pl'],
        defaultLocale: 'ru',
        cookieName: 'locale',
        extension: '.yaml',
        parse: function (data) {
            return require('js-yaml').safeLoad(data);
        },
        dump: function (data) {
            return require('js-yaml').safeDump(data);
        }
    });

    app.use(function(req, res, next) {
        req.i18n.setLocaleFromQuery();
        req.i18n.setLocaleFromCookie();
        next();
    });

    /***
     * JSON
     */
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    /**
     * Routing
     * */
    let router = require('../routes')
    router(app);
};