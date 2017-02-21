"use strict";
var express = require('express');
var app = express();
var fs = require("fs");

/////////////////////////////////////////////////////////////
//
// Server Setup
//

// set up host and port
var listenPort = 8080
var server = app.listen(listenPort);
console.log('Server listening on port: '+listenPort)

// serve static files from the public directory
app.use(express.static(__dirname + '/public'))



/////////////////////////////////////////////////////////////
//
// Initialization
//

// load data from files and convert to JSON
function getRestaurantData(filename) {
  let data = fs.readFileSync(__dirname + '/data/' + filename + '.json', 'utf8')
  //console.log(data)
  return JSON.parse(data)
}

// ** CREATE VARIABLES TO HOLD RESTAURANT AND CUISINE ARRAYS HERE **
var restaurants = []
var cuisines = []

// load the cuisines
cuisines = getRestaurantData('cuisines')
//cuisines now = [ "sushi", "tapas", "pho" ]

cuisines.forEach(function(cuisine) {

  //this iterates through the cuisines array

  // load each restaurant array
  let values = getRestaurantData(cuisine)
  //console.log(cuisine)
  //console.log(values)

  for( let i = 0; i < values.length; i++ ) {
    values[i].cuisine = cuisine
	
  }

  //console.log(values[0].cuisine)
  // concatenate the arrays
  Array.prototype.push.apply(restaurants,values)

})

console.log(restaurants[0].cuisine)

/////////////////////////////////////////////////////////////
//
// RESTful services
//

// get all cuisines
app.get('/cuisines', function(req, res){
  res.end(JSON.stringify(cuisines))
})

// get all restaurants
app.get('/restaurants', function (req, res){
  res.end(JSON.stringify(restaurants));
})

// get restaurants by cuisine
app.get('/restaurants/:cuisine', function (req, res){
  res.end(JSON.stringify(restaurants.filter( r => r.cuisine === req.params.cuisine )))
})