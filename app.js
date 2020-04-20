var express = require('express');
var app = express();
var faker = require('faker');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
		{name: faker.address.city()+', '+faker.address.county(), image: faker.image.nature()},
		{name: faker.address.city()+', '+faker.address.county(), image: faker.image.city()},
		{name: faker.address.city()+', '+faker.address.county(), image: faker.image.business()},
		{name: faker.address.city()+', '+faker.address.county(), image: faker.image.avatar()},
		{name: faker.address.city()+', '+faker.address.county(), image: faker.image.city()},
		{name: faker.address.city()+', '+faker.address.county(), image: faker.image.nature()}
	];

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res) {
	//get data from form and add to array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	//redirect back to home page
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
	res.render('new')
});

app.listen(4000, function(){
	console.log('The YelpCamp Server Has Started');
})