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
                console.log(weather);
                console.log(`${weather.sys.sunrise} - ${typeof weather.sys.sunrise}`);
                console.log(`${weather.timezone} - ${typeof weather.timezone}`);
                const formatTime = function(unixTimestamp) {
                    let date = new Date(unixTimestamp * 1000);
                    let hours = date.getHours();
                    let minutes = '0' + date.getMinutes();
                    return hours + ':' + minutes.slice(-2);
                }

                let place = `${weather.name}, ${weather.sys.country}`,
                    description = `${weather.weather[0].description}`,
                    icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                    temp = `${Math.round(weather.main.temp)}`,
                    sensed = `${Math.round(weather.main.feels_like)}`,
                    min = `${Math.round(weather.main.temp_min)}`,
                    max = `${Math.round(weather.main.temp_max)}`,
                    sunrise = `${formatTime(weather.sys.sunrise + weather.timezone - 3600)}`,
                    sunset = `${formatTime(weather.sys.sunset + weather.timezone - 3600)}`,
                    wind = `${Math.round(weather.wind.speed * 10) / 10}`,
                    cloudiness = `${weather.clouds.all}`,
                    pressure = `${Math.round(weather.main.pressure)}`,
                    humidity = `${weather.main.humidity}`;

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

app.listen(port);
console.log('Server started at http://localhost:' + port);