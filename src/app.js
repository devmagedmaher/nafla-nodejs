const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const queryParser = require('./middleware/queryParser');

require('dotenv').config();

const apiRouter = require('./routes/api');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors())
app.use(helmet()); // https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(queryParser());
app.use(cookieParser());

app.use('/api', apiRouter);

// serve static public folder
app.use('/', express.static('public'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// pass any errors to the error handler
app.use(errorHandler);

module.exports = app;
