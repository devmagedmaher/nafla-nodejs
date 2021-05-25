const generateToken = require('../../utils/generate-token');


module.exports.auth = (req, res, next) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = generateToken(username, password);
    res.status(200).send({ token });
  }
  else {
    res.status(401).send({ message: 'Invalid username or password'});
  }

}