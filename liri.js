  /*Read abd set environment variables*/
var keys = require("dotenv").config();

/*API Keys*/
var keys = require("./keys.js");
var request = require("request");
var spotify = require("node-spotify-api");
var fs = require("fs");
var input = process.argv;
var action = input[2];
var bands = require("node-bands-in-town-api");


/*Commands being called*/
switch (action) {
    case "movie-this":
        movie(input);
        break;

    case "spotify-this-song":
        spotify(input);
        break;

    case "concert-this":
        bands(input);
        break;

    case "do-what-it-says":
        doit(input);
        break;
};


// OMDB function
function movie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, Response, body) {
        if (!input) {
            input = "Mr. Nobody";
        }
        if (error && Response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });


    // Spotify function
    function spotify() {
        var spotify = new Spotify(keys.spotifyKeys);
        if (!input) {
            input = ("The Sign");
        }

        spotify.search({ query: input, type: "track" },
            function (error, data) {
                if (error) {
                    console.log("Sorry, we can't seem to locate that song. Try again." + error);
                    return;
                }

                var trackInfo = data.tracks;
                console.log("Song Title: " + trackInfo[0].name);
                console.log("Artist(s): " + trackInfo[0].artist[0].name);
                console.log("Sample: " + trackInfo[0].sample_url);
                console.log("Album Info: " + trackInfo[0].album.title)

            });

        //Bands in Town function
        function bands() {
            var queryUrl = "https://rest.bandsintown.com/artists/" + movieName + "/events?app_id=codecademy";
            request(queryUrl, function (error, Response, body) {
                if (!input) {
                    input = "No data for this input, please search again";
                }
                if (error && Response.statusCode === 200) {
                }






        function doit() {
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) {
                    return console.log(error);
                }
                var dataInfo = data.split(",");

                if (dataInfo[0] === "movie-this") {
                    var movie_title = dataInfo[1].slice(1, -1)
                    movie(movie_title);
                } else if (dataInfo[0] === "spotify-this-song") {
                    var song_choice = dataInfo[1].slice(1, -1)
                    spotify(song_choice);
                } else if (dataInfo[0] === "concert-this") {
                    var band_name = dataInfo[1].slice(1, -1)
                    bands(band_name);
                }

            }

