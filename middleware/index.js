//all middleware goes here
const Campground = require("../models/campground"),
	Comment = require("../models/comment");

const middlewareObj = {
	checkCampgroundOwnership: (req, res, next) => {
		
	if(req.isAuthenticated()) 
	{ 
		Campground.findById(req.params.id, (err, foundCampground) => 
		{
			if(err) 
			{
				req.flash("error", "Campground not found");
				console.log(err);
				res.redirect("/campgrounds");
			} else 
			{
				if(foundCampground.author.id.equals(req.user._id)) {
					return next();
				} else {
					req.flash("error", "You do not have permission to do that.");
					res.redirect("back");
				}
				
			}
		});
	}else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("back");
	}
	},
	isLoggedIn: (req,res,next)=> {
		if(req.isAuthenticated()) {
		return next();
	}
		req.flash("error", "You need to be logged in to do that!");
	res.redirect("/login");
	}
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
	if(req.isAuthenticated()) 
	{ 
		Comment.findById(req.params.comment_id, (err, foundComment) => 
		{
			if(err) 
			{
				console.log(err);
				res.redirect("/back");
			} else 
			{
				if(foundComment.author.id.equals(req.user._id)) {
					return next();
				} else {
					req.flash("error", "You don't have permission to do that.");
					res.redirect("back");
				}
				
			}
		});
	}else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("back");
	}
	
};




module.exports = middlewareObj;