'use strict';
const log = console.log;

// Require external modules
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const express = require('express');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');

// Require custom modules
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');

// Express APP
const app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout:'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.png'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));


// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user ? req.user.username.split('@')[0] : null;
    res.locals.need_nav_search = false;
    const url = req.originalUrl;
    if (url === '/login' || url === '/register') {
        res.locals.need_nav_search = true;
    }
    if (url === '/user/upload') {
        res.locals.need_nav_search = true;
    }
    next();
});

// Set up routes
const root_routes = require('./routes/root_routes');
const secondary_user_routes = require('./routes/secondary_user_routes');
const secondary_admin_routes = require('./routes/secondary_admin_routes');

/* Our routes:
    /
    /login
    /register
    /logout
    /user/...
    /admin/...
*/
app.use('/', root_routes);
app.use('/user', secondary_user_routes);
app.use('/admin', secondary_admin_routes);

// Password
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Start the server
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), '127.0.0.1', () => {
    log(`Listening on port ${app.get('port')}...`)
});

