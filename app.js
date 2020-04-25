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
		image: String
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
			res.render('campgrounds',{campgrounds:allCampground})
		}
	})
});

app.post('/campgrounds', function(req, res) {
	//get data from form and add to array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	//create new campground and save to db
	Campground.create(newCampground, function(err,newlyCreated){
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

app.get('/campgrounds/new', function(req, res){
	res.render('new')
});

app.listen(4001, function(){
	console.log('The YelpCamp Server Has Started');
})
