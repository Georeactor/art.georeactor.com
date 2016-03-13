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

const Sprite = require('./models/sprite');

mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'localhost');

const app = express();
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

app.get('/sample', csrfProtection, function (req, res) {
  res.render('sample');
});

app.get('/map/create', csrfProtection, function (req, res) {
  res.render('create', {
    csrfToken: req.csrfToken()
  });
});

app.get('/map/view/:id', csrfProtection, function (req, res) {
  res.render('sample', {
    id: req.params.id
  });
});

app.post('/upload', csrfProtection, function (req, res) {
  var background = req.body.background;
  // console.log(req.body.textures);
  var water = req.body.textures.water;

  var s = new Sprite({
    images: [{
      url: water
    }],
    width: 100,
    height: 100
  });

  s.save(function(err) {
    if (err) {
      return res.json({ success: false, error: err });
    }
    res.json({
      success: true,
      _id: s._id
    });
  });
});

app.get('/sprite/:id.json', function (req, res) {
  Sprite.findById(req.params.id, function(err, s) {
    res.json({
      water: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        pixelRatio: 1,
        sdf: false
      }
    });
  });
});

app.get('/sprite/:id.png', function (req, res) {
  var myid = req.params.id.replace('@2x', '');
  Sprite.findById(myid, function(err, s) {
    var c = new Canvas(100, 100);
    var ctx = c.getContext('2d');
    var i = new Canvas.Image();
    i.src = s.images[0].url;
    ctx.drawImage(i, 0, 0, 100, 100);
    res.send(c.toBuffer());
  });
});

app.listen(process.env.PORT || 8080, function() { });

module.exports = app;
