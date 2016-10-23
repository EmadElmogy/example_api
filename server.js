// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// HAL support
var halson = require('halson');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port, defaulting if nothing is specified in the env
var port = process.env.PORT || 8080;

// load app configurations from config.js
var config = require('./config');

// configure our connection to MongoDB
var mongoose = require('mongoose');

// establish our MongoDB connection for the models
mongoose.connect(config.db[app.settings.env]);

// import models
var ProductQuantity = require('./app/models/library');

// get an instance of the express Router, allowing us to add
// middleware and register our API routes as needed
var router = express.Router();


router.get('/library/:book_id', function(req, res) {
    ProductQuantity.findOne({book_id: req.params.book_id}, function(err, library) {
        if (err) {
	    res.status(500);
	    res.setHeader('Content-Type', 'application/vnd.error+json');
	    res.json({ message: "Failed to fetch Library"});
	} else if (productQuantity == null) {
	    res.status(404);
	    res.setHeader('Content-Type', 'application/vnd.error+json');
	    res.json({ message: "Library not found for book_id "+req.params.book_id});
	} else {
	    res.status(200);
	    res.setHeader('Content-Type', 'application/hal+json');

	    var resource = halson({
		book_id: library.book_id,
		category_name: library.category_name,
		book_price: library.book_price
  }).addLink('self', '/library/'+library.book_id)
	    res.send(JSON.stringify(resource));

	}
    });
});


// Register our route
app.use('/', router);

// Start the server
app.listen(port);
console.log('Running on port ' + port);
