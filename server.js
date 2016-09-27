// server.js

// modules =================================================
var express= require('express');
var middleware = require('./middleware');
var lang = require('./lang');
var app=express();

// set our port
var port = process.env.PORT || 3000; 

app.use(express.static(__dirname + '/client'));
app.set('view engine', 'pug'); 
app.use(middleware.ensureLang);

// routes ==================================================

var router = express.Router();

/***************************
			HOME
***************************/
router.get('/', function(req, res) {
	res.render('index.pug', { lang: req.lang, translations: lang.translations[req.lang] });
});

/***************************
		PRODUCTS
***************************/
router.get('/prodotti', function(req, res) {
	res.render('products.pug', { lang: req.lang, translations: lang.translations[req.lang] });
});
router.get('/products', function(req, res) {
	res.render('products.pug', { lang: req.lang, translations: lang.translations[req.lang] });
});

app.get('/', function(req, res) {
	res.redirect('/' + req.lang);
});
app.use('/it', function (req, res, next) {
	req.lang='it';
	next();
});
app.use('/en', function (req, res, next) {
	req.lang='en';
	next();
});
app.use('/it', router);
app.use('/en', router);

app.get('/coming-soon', function(req, res) {
	res.sendFile(__dirname + '/client/coming-soon.html');
});


app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + '/client/404.html');
});

// start app ===============================================
// startup our app at http://localhost:3000
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;