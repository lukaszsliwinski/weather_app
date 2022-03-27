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

// Render main page without weather data
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
            // Catch error
            res.render('index', { weather: null, place: 'Error, please try again' });
            console.log(err);
        } else {
            // Create weather object from request body 
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
                // Render if city doesn't exist in db
                res.render('index', {
                    weather: null,
                    place: `\xa0\xa0${req.body.city} doesn't exist`,
                });
            } else {
                // Format date to 'DD-MM-YYYY'
                const formatTime = function(unixTimestamp) {
                    let date = new Date(unixTimestamp * 1000);
                    let hours = date.getHours();
                    let minutes = '0' + date.getMinutes();
                    return hours + ':' + minutes.slice(-2);
                }

                // Create weather parameters
                let place = `${weather.name}, ${weather.sys.country}`,
                    description = `${weather.weather[0].description}`,
                    icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                    temp = `${Math.round(weather.main.temp)}`,
                    sensed = `${Math.round(weather.main.feels_like)}`,
                    min = `${Math.round(weather.main.temp_min)}`,
                    max = `${Math.round(weather.main.temp_max)}`,
                    sunrise = `${formatTime(weather.sys.sunrise + weather.timezone - 7200)}`,
                    sunset = `${formatTime(weather.sys.sunset + weather.timezone - 7200)}`,
                    wind = `${Math.round(weather.wind.speed * 10) / 10}`,
                    cloudiness = `${weather.clouds.all}`,
                    pressure = `${Math.round(weather.main.pressure)}`,
                    humidity = `${weather.main.humidity}`;

                // Render view with weather parameters
                res.render('index', {
                    weather: weather,
                    place: place,
                    description: description,
                    icon: icon,
                    temp: temp,
                    sensed: sensed,
                    min: min,
                    max: max,
                    sunrise: sunrise,
                    sunset: sunset,
                    wind: wind,
                    cloudiness: cloudiness,
                    pressure: pressure,
                    humidity: humidity,
                });
            };
        };
    });
});

// Start server
app.listen(port);
console.log('Server started at http://localhost:' + port);