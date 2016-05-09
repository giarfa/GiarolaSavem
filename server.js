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
// app.set('view engine', 'ejs');

// routes ==================================================
// require('./app/routes')(app); // configure our routes

app.get('/', function(req, res) {
	res.render('index.pug', { lang: req.lang, translations: lang.translations[req.lang] });
	//res.sendFile(__dirname + '/client/index.html');
});
app.get('/coming-soon', function(req, res) {
	res.sendFile(__dirname + '/client/coming-soon.html');
});

// db.syncDb();
// db.setUp();

// start app ===============================================
// startup our app at http://localhost:3000
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;