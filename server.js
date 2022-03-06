// Require dependencies
const express = require('express');
const bp = require('body-parser');
const request = require('request');
const app = express();

// Port number
const port = 3000;

// Dotenv package
require('dotenv').config();

// Openweathermap api key
const apiKey = `${process.env.API_KEY}`;

// Middleware
app.use(express.static('./public'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('index', {
        weather: null,
        place: null
    });
});

// Post request for receive data from openweathermap using city name
app.post('/', (req, res) => {

    // Get city name from request body
    const city = req.body.city;

    // Create url for chosen city
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Request for data using the URL
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, place: 'Error, please try again' });
            console.log(err);
        } else {
            // Create object from data 
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
                res.render('index', {
                    weather: null,
                    place: `${req.body.city} doesn't exist`,
                });
            } else {
                let place = `${weather.name}, ${weather.sys.country}`,
                    temp = `${Math.round(weather.main.temp)}`,
                    description = `${weather.weather[0].description}`,
                    icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                    min = `${Math.round(weather.main.temp_min)}`,
                    max = `${Math.round(weather.main.temp_max)}`,
                    humidity = `${weather.main.humidity}`,
                    wind = `${Math.round(weather.wind.speed * 10) / 10}`;

                res.render('index', {
                    weather: weather,
                    place: place,
                    temp: temp,
                    description: description,
                    icon: icon,
                    min: min,
                    max: max,
                    humidity: humidity,
                    wind: wind,
                });
            };
        };
    });
});

app.listen(port);
console.log('Server started at http://localhost:' + port);