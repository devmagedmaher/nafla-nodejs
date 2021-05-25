const generateToken = require('../utils/generate-token');


module.exports = () => {
  
  return (req, res, next) => {
    const auth = req.get('Authorization');
    console.log({ auth });

    if (auth) {
      const token = auth.replace('Bearer ', '');
      const username = process.env.ADMIN_USERNAME;
      const password = process.env.ADMIN_PASSWORD;
      if (token === generateToken(username, password)) {
        next();
        return;
      }
    }

    next({
      expose: true,
      message: 'Authorization Error',
      status: 403,
    });
  } 

}