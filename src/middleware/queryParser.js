

module.exports = () => {
  
  return async (req, res, next) => {
    let newQuery = {};
    for (let key in req.query) {
      try {
        console.log(key, req.query[key]);
        const json = JSON.parse(req.query[key]);
        newQuery[key] = json;
      }
      catch (error) {
        console.log(`[${key}] key is not parsable.`);
        newQuery[key] = req.query[key];
      }
    }
    // res.send({query: req.query, newQuery});
    req.query = newQuery;
    next();
  }

}