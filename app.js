var express = require('express'),
		app = express(),
		faker = require('faker'),
		bodyParser = require('body-parser');
		mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//shema setup
var campgroundSchema = new mongoose.Schema({
		name: String,
		image: String,
		description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	//get all campgrounds from db:
	Campground.find({}, function (err, allCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('index',{campgrounds:allCampground})
		}
	})
});

app.post('/campgrounds', function(req, res) {
	//get data from form and add to array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//create new campground and save to db
	Campground.create(newCampground, function(err,newlyCreated){
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

// Campground.create({
// 	name: faker.fake('{{address.city}}, {{address.county}}'),
// 	image: faker.image.image(),
// 	description: faker.company.catchPhraseDescriptor()
// }, function(err,campground){
// 	if (err) {
// 	console.log(err);
// } else {
// 	console.log('new camp ' + campground);
// }
// });

app.get('/campgrounds/new', function(req, res){
	res.render('new')
});

app.get('/campgrounds/:id', function(req, res){
	//find requested id
	Campground.findById(req.params.id, function(err, foundCampground){
		if (err) {
			console.log(err);
		} else {
			//rendeer show
			res.render('show', {campground: foundCampground});
		}
	});
	})

app.listen(4001, function(){
	console.log('The YelpCamp Server Has Started');
})
