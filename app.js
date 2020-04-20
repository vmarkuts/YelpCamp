var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	
})

app.listen(4000, function(){
	console.log('The YelpCamp Server Has Started');
})