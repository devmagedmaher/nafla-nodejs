module.exports = (req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'Content-Range');
  next();
}