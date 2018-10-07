'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config'),
    listingData = [];

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
    toJSON();
});

connection.on("disconnected", function () {
    console.log("Disconnected from db");
});

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 

  Remember that we need to read in a file like we did in Bootcamp Assignment #1.
 */

var toJSON = function () {
  fs.readFile('./listings.json', 'utf8', function (err, data) {
      if (err) {
          console.log(err);
          return;
      }
      listingData = JSON.parse(data);
      addListings();
  });
};

var addListings = function () {
  Listing.remove({}, function (err) {
      if (err) throw err;

      addToDB();
  });
};

var addToDB = function () {
  for (var obj in listingData["entries"]) {

      var entry = new Listing(listingData["entries"][obj]);

      entry.save(function (err) {
          if (err) {
              console.log(err);
          }
          mongoose.disconnect();
      });
  };
};

/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */

// Listing.create(listingData.entries, finished);
// function finished(){
//   mongoose.disconnect();
// };