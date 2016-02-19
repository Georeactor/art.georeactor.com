const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const compression = require('compression');
const mongoose = require('mongoose');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const cloudinary = require('cloudinary');

const Canvas = require('canvas');


mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'localhost');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express['static'](__dirname + '/static'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser());
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  secret: process.env.SESSION || 'efh2ofh289yfwevn9',
  resave: false,
  saveUninitialized: false
}));

app.get('/', csrfProtection, function (req, res) {
  res.render('index');
});

app.get('/create', csrfProtection, function (req, res) {
  res.render('create');
});

app.post('/upload', csrfProtection, function (req, res) {
  res.json({});
});

app.get('/sprite/:id', csrfProtection, function (req, res) {
  res.send('sprite');
});

app.listen(process.env.PORT || 8080, function() { });

module.exports = app;
