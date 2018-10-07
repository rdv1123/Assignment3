/* Add all the required libraries*/
var mongoose = require('mongoose'),
    Listing = require('./ListingSchema'),
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
  });
var connection = mongoose.connection;

connection.on('connected', function () {
    console.log("Connected to db")
    // findLibraryWest();
    // removeCable();
    // updatePhelpsMemorial();
    // retrieveAllListings();
});

connection.on("disconnected", function () {
    console.log("Disconnected from db");
});

/* Fill out these functions using Mongoose queries*/

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
  Listing.find({name: "Library West"}, function (err, value) {
    if (err) throw err;

    console.log(value);
});
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This corresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
  Listing.findOneAndRemove({code: "CABL"}, function (err) {
    if (err) throw err;
    console.log('CABL removed successfully!');
    retrieveAllListings();
});
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
  Listing.findOneAndUpdate({name:"Phelps Laboratory"}, {address:"102 Phelps Lab, Gainesville, FL 32611"}, function (err, data) {
    if (err) throw err;
  });

  Listing.find({name: "Phelps Laboratory"}, function (err, value) {
      if (err) throw err;

      console.log(value);
  });
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
  Listing.find({}, function (err, data) {
    if (err) throw err;

    const util = require('util')
    console.log(util.inspect(data, {maxArrayLength: null}));
    // console.log(data)
  });
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();
// mongoose.disconnect();