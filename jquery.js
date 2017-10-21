//var Database = require("arangojs").Database;
//var aql = require("arangojs").aql;
var mongoose = require('mongoose');
mongoose.connect('mongodb://Rapid Wheels:wheels@ds157584.mlab.com:57584/rapid-wheels');
const ipInfo = require("ipinfo");

/*
const db = new Database({url: `http://root:@localhost:8529`,
  databaseName: "_system"
});
var result = db.query("for location in CurrentLocations RETURN location").then(function(result, error){ 
    return result.all();
    }).then(function(result, error){
    console.log(result);
})

navigator.geolocation.getCurrentPosition(function (position) {
    updatePosition(position);
    setInterval(function(){
        var lat = currPosition.coords.latitude;
        var lng = currPosition.coords.longitude;
    }, 1000);
}, errorCallback);

var currPosition;
setInterval(function(){}, 1000);

var watchID = new geolocation.Watcher(function(position) {
    updatePosition(position);
});

function updatePosition( position ){
    currPosition = position;
}

function errorCallback(error) {
    var msg = "Can't get your location. Error = ";
    if (error.code == 1)
        msg += "PERMISSION_DENIED";
    else if (error.code == 2)
        msg += "POSITION_UNAVAILABLE";
    else if (error.code == 3)
        msg += "TIMEOUT";
    msg += ", msg = "+error.message;

    alert(msg);

}*/

/*console.log("hello");
var x = "";
getLocation();
function getLocation() {
    if (navigator.geolocation) {
        console.log("hello");
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
    console.log("hello");
}*/
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

    var routes = mongoose.Schema({
        _key: String,
        lat: Number,
        long: Number,
        timestp: Number
    });

    var Bus = mongoose.model('Bus', routes);
    var the_interval = 5000;
   // var minutes = 5, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("I am doing my 5 second check");
  // do your stuff here
      ipInfo((err, cLoc) => {
    console.log(err || cLoc);
   var latlong = cLoc.loc.split(",")
   console.log(latlong[0]);
   console.log(latlong[1]);

   pushToDb(latlong[0], latlong[1]);
   // { ip: '94. ... .77',
   //   hostname: '... .com',
   //   city: '...',
   //   region: 'England',
   //   country: 'GB',
   //   loc: '5...,3...',
   //   org: '... UK Limited',
   //   postal: '...' }
});
}, the_interval);

function pushToDb(latpram, longpram){
    var bus = {
        _key: 'bus1',
        lat: latpram,
        long: longpram,
        timestp: 1400
    }
    //instead of save, use findoneandupdate
    Bus.findOneAndUpdate({_key:'bus1'}, {$set:bus}, {upsert:true},
        function (err){
        if (err) return console.error(err);
        console.log("success");
    })

    // bus1.save(function (err){
    //     if (err) return console.error(err);
    //     console.log("success");
    // })

}

