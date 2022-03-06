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
    res.render('index');
});

// Post request for receive data from openweathermap using city name
app.post('/', (req, res) => {

    // Get city name from request body
    const city = req.body.city;

    // Create url for chosen city
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Request for data using the URL
    request(url, function (err, response, body) {

        // Create object from data 
        let forecast = JSON.parse(body);
        console.log(forecast);
    });
});

app.listen(port);
console.log('Server started at http://localhost:' + port);