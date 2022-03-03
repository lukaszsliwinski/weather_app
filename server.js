const express = require('express');
const bp = require('body-parser');

const port = 3000;
const app = express();

require('dotenv').config();

app.use(express.static('./public'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.listen(port);
console.log('Server started at http://localhost:' + port);