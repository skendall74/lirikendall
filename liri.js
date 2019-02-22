#!/usr/bin/env node

const env = require("dotenv").config();

const inquirer = require("inquirer");
const axios = require('axios');

const Spotify = require('node-spotify-api');
const omdb = require('omdb');

const moment = require('moment');
const fs = require('file-system');

const keys = require('./assets/keys.js');
const spotify = new Spotify(keys.spotify);

// Spotify this Song
function SpotifyThisSong(song) {
    spotify.search({
        type: 'track',
        query: song
    }, function (err, spotData) {
        if (err) {
            spotify.search({
                type: 'track',
                query: "The Sign"
            }, function (err, spotData) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                const artists = spotData.tracks.items[0].artists;
                for (var i = 0; i < artists.length; i++) {
                    console.log('Artist: ' + artists[i].name);
                }
                console.log('Song Name: ' + spotData.tracks.items[0].name);
                console.log('Preview URL: ' + spotData.tracks.items[0].preview_url);
                console.log('Album Name: ' + spotData.tracks.items[0].album.name);
            });
        }
        const artists = spotData.tracks.items[0].artists;
        for (var i = 0; i < artists.length; i++) {
            console.log('Artist: ' + artists[i].name);
        }
        console.log('Song Name: ' + spotData.tracks.items[0].name);
        console.log('Preview URL: ' + spotData.tracks.items[0].preview_url);
        console.log('Album Name: ' + spotData.tracks.items[0].album.name);
    });
}

// Bands in Town
function FindConcert(artist) {
    const url = ("https://rest.bandsintown.com/artists/" + artist + "/events?");
    axios.get(url, {
            params: {
                app_id: 'codingbootcamp'
            }
        })
        .then(res => {
            const concerts = res.data;
            for (var i = 0; i < concerts.length; i++) {
                console.log('=======');
                console.log('Venue: ' + concerts[i].venue.name);
                console.log('Location: ' + concerts[i].venue.city + ", " + concerts[i].venue.region + " " + concerts[i].venue.country);
                console.log('When: ' + moment(concerts[i].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a"));
            }
        }).catch(console.error);
}

// OMDB
function MovieThis(movie) {
    console.log(movie);
    const url = ("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=e6ccb27");
    console.log(url);
    axios.get(url).then(res => {
        console.log('Title: ', res.data.Title);
        console.log('Year: ', res.data.Year);
        console.log('Rating: ', res.data.imdbRating);
        console.log('Tomatoes: ', res.data.Ratings[1].Value);
        console.log('Country: ', res.data.Country);
        console.log('Language(s): ', res.data.Language);
        console.log('Plot: ', res.data.Plot);
        console.log('Actor(s): ', res.data.Actors);
    }).catch(console.error);
}

// Write to Log.Txt File - Data
function WriteLog(action, subject) {
    fs.appendFile("log.txt", action + "," + subject + ",", function (err) {
        // Any errors it will log to the console.
        if (err) {
            return console.log(err);
        }
        // Otherwise, it will print: "movies.txt was updated!"
        console.log("log updated!");
    });
}

// Prompt the user to give a command.
inquirer.prompt([{
        type: "list",
        name: "selectCommand",
        message: "Which would you like?",
        choices: ["Find a concert", "Spotify a song", "Find a movie", "Do what it says"]
    }

    // After the prompt, store the user's response in a variable called location after response.
    // Movie, Concert, Spotfiy and Do What it Says
]).then(function (prompt) {

    if (prompt.selectCommand === "Find a movie") {

        inquirer.prompt([{
                type: "input",
                name: "selectMovie",
                message: "What movie can I lookup for you?"
            } // Store the user's response and call.
        ]).then(function (movie) {
            MovieThis(movie.selectMovie);
            WriteLog("Find a movie", movie.selectMovie);
        });
    } else if (prompt.selectCommand === "Find a concert") {
        inquirer.prompt([{
                type: "input",
                name: "selectArtist",
                message: "What band or artist can I search for you?"
            }
            // Store the user's response and call.
        ]).then(function (artist) {
            FindConcert(artist.selectArtist);
            WriteLog("Find a concert", artist.selectArtist);
        });
    } else if (prompt.selectCommand === "Spotify a song") {
        inquirer.prompt([{
                type: "input",
                name: "selectSong",
                message: "What song can I spotify for you?"
            }
            // Store the user's response and call.
        ]).then(function (song) {
            SpotifyThisSong(song.selectSong);
            WriteLog("Spotify a song", song.selectSong);
        });
    } else if (prompt.selectCommand === "Do what it says") {

        fs.readFile("random.txt", "utf-8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            const dataArr = data.split(",");
            if (dataArr[0] === "Spotify a song") {
                SpotifyThisSong(dataArr[1]);
                WriteLog("Spotify a song", dataArr[1]);
            } else if (dataArr[0] === "Find a concert") {
                FindConcert(dataArr[1]);
                WriteLog("Find a concert", dataArr[1]);
            } else if (dataArr[0] === "Find a movie") {
                MovieThis(dataArr[1]);
                WriteLog("Find a movie", dataArr[1]);
            }
        });

    } else {
        console.log("I will go take a walk in the park.");
    }
});