var express = require('express');
var app = express();
var faker = require('faker');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	var campgrounds = [
		{name: faker.address.city()+', '+faker.address.county(), image: faker.image.avatar()},
		{name: faker.address.city()+', '+faker.address.county(), image: faker.image.avatar()},
		{name: faker.address.city()+', '+faker.address.county(), image: faker.image.avatar()}
	]

	res.render('campgrounds', {campgrounds: campgrounds});
})

app.listen(4000, function(){
	console.log('The YelpCamp Server Has Started');
})