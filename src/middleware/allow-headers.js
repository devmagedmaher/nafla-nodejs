module.exports = (req, res, next) => {
  // res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('Accept', 'application/vnd.api+json; charset=utf-8');
  res.header('Content-Type', 'application/vnd.api+json; charset=utf-8');
  next();
}