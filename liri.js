require("dotenv").config();
var keys = require("./keys.js");
let axios = require("axios");
let moment = require('moment');
let Spotify = require('node-spotify-api');
// var spotify = require('node-spotify-api');
// var band = require('bandsintown');

var nodeArgs = process.argv;
var operator = nodeArgs[2];
var value = nodeArgs[3];

switch(operator){
    case "concert-this":
        concert(value);
    break;

    case "spotify-this-song":
        spotify(value);
    break;

    case "movie-this":
        movie(value);
    break;
    
    case "do-what-it-says":
        doWhat();
    break;
}

function movie(value){
    let queryUrl;
    if(value){
        queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function(response) {
              // If the axios was successful...
              // Then log the body from the site!
              console.log(response.data);
              console.log("Release Year: " + response.data.Year);// Log the Release Year for the movie
            })
    }else{
        value ="Mr.Nobody";
        queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function(response) {
              // If the axios was successful...
              // Then log the body from the site!
              console.log(response.data);
              console.log("Title: " + response.data.Title);
              console.log("Release Year: " + response.data.Year);// Log the Release Year for the movie
              console.log("Rating: " + response.data.Rated);
              console.log("Country: " + response.data.Country);
              console.log("Language: " + response.data.Language);
              console.log("Plot: " + response.data.Plot);
              console.log("Actors: " + response.data.Actors);
            })
    }
}

function concert(value) {
    var artist = value;
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(url).then(
        function (response) {
            // console.log(response.data)
            for (var i = 0; i < response.data.length; i++) {
                console.log("Concert Time: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A'));
                console.log("Concert Location: " + response.data[i].venue.city + "," + response.data[i].venue.region + "," + response.data[i].venue.country);
                console.log("Concert Venue: " + response.data[i].venue.name);
        }
    });
};

function spotify(value){
    let spotify = new Spotify(keys.spotify);

    if (!value) {
        value = "The Sign" 
    }
    spotify.search({ type: 'track', query: value }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
    //   console.log(data.tracks.items); 
    console.log("Artists: "+ data.tracks.items[0].artists.name);
      console.log("Name of the song: " + data.tracks.items[0].name);
      console.log("URL link: " + data.tracks.items[0].preview_url);
      console.log("Album: "+ data.tracks.items[0].album.name);

    });
}