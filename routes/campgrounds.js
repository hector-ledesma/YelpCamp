const express 		= require("express"),
	  router 		= express.Router(),
	  Campground 	= require("../models/campground"),
	  middleware 	= require("../middleware");


//INDEX ROUTE
router.get('/', (req, res) => {
	// Get all campgrounds from DB
	Campground.find({}, (err, camp) => {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: camp, currentUser: req.user});
		}
	});
});

//NEW ROUTE
router.get('/new',middleware.isLoggedIn, (req, res) => {
	res.render('campgrounds/new');
});

//CREATE ROUTE
router.post('/',middleware.isLoggedIn, (req, res) => {
	
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id ,
		username:req.user.username
	};
	var newCampground = {name: name, image: image, description: desc, author: author};
	//Create a new campground and save to DB
	Campground.create(newCampground, (err, newCamp) => {
		if (err) {
			console.log(err);
		} else {
			console.log(newCamp);
			res.redirect('/campgrounds');
		}
	});
	//redirect back to campgrounds page
	
});

//SHOW - shows more info
router.get('/:id', (req, res) => {
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err) {
			console.log(err);
		} else {
			//render show template with that campground 
			res.render('campgrounds/show', {campground: foundCampground});
		}
	});
});

//EDIT - shows edit form
router.get("/:id/edit",middleware.checkCampgroundOwnership, (req, res) => {
	//is user logged in? 
		Campground.findById(req.params.id, (err, foundCampground) => 
		{
			res.render("campgrounds/edit", {campground: foundCampground});
		});
	//if not, redirect
	
});

//UPDATE - put request | updates campground form
router.put("/:id",middleware.checkCampgroundOwnership,(req, res) => {
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.edit, (err, updatedCampground) => {
		if(err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
	//redirect somewhere(show page)
});


module.exports = router;