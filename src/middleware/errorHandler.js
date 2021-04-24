const createError = require('http-errors');


// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log('from errorHandler middleware', err);

  // if err message is safe to expose to client
  if (err.expose === true) {
    res.status(err.status || 500).send(err);
  } else {
    res.status(500).send(createError.InternalServerError());
  }
};


module.exports = errorHandler;
