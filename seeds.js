const mongoose = require ('mongoose'),
	  Campground = require ('./models/campground'),
	  Comment 	= require("./models/comment");

let data = [
	{
		name: "Cloud's Rest", 
		image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a porttitor metus. Vivamus maximus laoreet ipsum, quis ultricies ex vehicula eu. Vestibulum consequat, sem et iaculis sollicitudin, mauris nulla mattis enim, at luctus ligula neque id lorem. Nullam at convallis purus, sit amet auctor nibh. Nullam tellus ligula, vulputate quis leo nec, faucibus volutpat velit. Donec lacinia, nibh sit amet lobortis luctus, est quam pharetra arcu, ut ornare est tellus et diam. Donec porttitor tempor pellentesque. Proin et dolor feugiat, sollicitudin nulla a, elementum lorem. Pellentesque maximus non mi nec mollis. Pellentesque vitae laoreet nulla, id auctor massa. In ac hendrerit urna. Proin sit amet eros lorem. Ut eget elementum urna. Mauris luctus pulvinar lectus in cursus."
	},
	{
		name: "Desert Mesa", 
		image: "https://images.unsplash.com/photo-1470805453991-a1b8c719cc70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description: "Proin at tellus convallis, porttitor arcu ac, cursus quam. Maecenas dictum malesuada felis ut eleifend. Vestibulum mattis velit lacus, in aliquam odio finibus id. Phasellus vitae tortor sit amet neque scelerisque feugiat. Ut non sagittis elit, vel faucibus diam. Sed dignissim eros non velit consectetur hendrerit. Vivamus ultrices ipsum nec rutrum elementum. Integer magna magna, congue et interdum sit amet, porttitor et nunc. Sed in diam auctor, dignissim orci id, consequat est."
	},
	{
		name: "Destiny's Bridge", 
		image: "https://images.unsplash.com/photo-1529335368860-022a22e0a944?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description: "Proin at tellus convallis, porttitor arcu ac, cursus quam. Maecenas dictum malesuada felis ut eleifend. Vestibulum mattis velit lacus, in aliquam odio finibus id. Phasellus vitae tortor sit amet neque scelerisque feugiat. Ut non sagittis elit, vel faucibus diam. Sed dignissim eros non velit consectetur hendrerit. Vivamus ultrices ipsum nec rutrum elementum. Integer magna magna, congue et interdum sit amet, porttitor et nunc. Sed in diam auctor, dignissim orci id, consequat est."
	}
];

function seedDB() {
	//Remove all campgrounds
	Campground.remove ({}, (err) => {
		if(err) {
			
		} else {
			console.log("removed campground");
		}
		//add a few campgrounds
		data.forEach((seed) => {
		Campground.create(seed, (err, campground) => {
			if (err) {
				console.log(err);
			} else {
				console.log("added a campground");
				//create a comment
				Comment.create({
					text: "This place is great, but I wish there was internet",
					author: "Homer"
				}, (err, comment) => {
					if(err) {
						console.log(err);
					} else {
					campground.comments.push(comment);
					campground.save();
						console.log("Created new comment");
						}
					});
				}
			});
		});
	});
}

module.exports = seedDB;