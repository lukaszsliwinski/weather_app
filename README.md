# Weather app

## About
Application for check actual weather in chosen city. Weather data are taken from openweathermap.org. This is my first application with the use of an external API. The view is rendered with EJS view engine.

## Demo
https://weatherappportfoliov1.herokuapp.com/

## Used technologies
JavaScript<br>
Node.js<br>
Express<br>
HTML5<br>
CSS3<br>
Bootstrap

## Setup and run on localhost (Windows)
1 Install Node.js v.16 from website:<br>
&emsp;https://nodejs.org/en/download/<br>
2 Download repository
```bash
git clone https://github.com/lukaszsliwinski/weather_app
```
3 Go into main directory
```bash
cd weather_app
```
4 Install required packages
```bash
npm install
```
5 Create .env file in main directory. In this file, create variable:
```bash
API_KEY = 'your_api_key'
```
Create an account on https://openweathermap.org, get api key and assign to the API_KEY variable.<br><br>
6 Run application on localhost
```bash
node app.js
```
7 Enter localhost:3000 in browser to run the app