const express = require("express");
require('dotenv').config();
const path = require("path");
const bodyParser = require("body-parser");



/*
|--------------------------------------------------------------------------
| Create an instance of the express module
|--------------------------------------------------------------------------
|
| Express is a minimal and flexible Node.js web application framework that 
| provides a robust set of features for web and mobile applications.
|
*/

const app = express();


/*
|--------------------------------------------------------------------------
| Setup a default template engine
|--------------------------------------------------------------------------
*/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


/*
|--------------------------------------------------------------------------
| Setup a body parser
|--------------------------------------------------------------------------
*/

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const api = require("./routes/api")

app.use('/', api)

module.exports = app