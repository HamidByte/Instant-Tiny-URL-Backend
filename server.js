const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes
// app.use(cors({ origin: '*' })); // For development environment, set it to allow all origins
// app.use(cors({ origin: 'http://127.0.0.1:5173' })); // For production environment, specify the allowed origins explicitly

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB();

// Use routes from the 'routes' directory
app.use('/', routes);

module.exports = app;