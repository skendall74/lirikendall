# lirikendallbot

lirikendallbot runs off Node. It is patterned off Iphone Siri, but instead of being voice activated it takes user prompts and gives out commands using parameters and giving by data based responses requested by the user. This app focuses on concerts, songs, and movies.

**

DIRECTIONS:

This is just a simple Bot: From console: npm i lirikendallbot

Search any Concert, Song, Movie Next: node liri.js

**

require("axios") Axios uses the API: .._ - node-spotify-api .._ - rest.bandsintown.com ..* - omdbapi.com to get a response of bands on tour.

require("omdb") && require('node-spotify-api') NPM install that call their respective services through the Axios about to GET information asked for in the data search.

require('./key' && dotenv) Maintains secret keys in seperate file not included in a private git repo repository.

require('fs') Write and read txt files.

require("inquirer") Allows the user to collect requested information based on their selection.

require('moment') Allows the concert and movie goer to keep up with the latest movie times and concert times.

====================

What the UI Says:
![Image of UI](https://raw.githubusercontent.com/skendall74/lirikendall/master/assets/concert%20.png)

What the Concert Says:
![Image of Concert](https://raw.githubusercontent.com/skendall74/lirikendall/master/assets/concert%20.png)

What the Movie Says:
![Image of Movie](https://raw.githubusercontent.com/skendall74/lirikendall/master/assets/movie.png)

What the Song Says:
![Image of Song](https://raw.githubusercontent.com/skendall74/lirikendall/master/assets/song%20.png)

What the File Says:
![Image of Concert](https://raw.githubusercontent.com/skendall74/lirikendall/master/assets/says.png)
