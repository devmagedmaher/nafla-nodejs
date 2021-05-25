const crypto = require('crypto');


module.exports = (username, password) => {

  const token = `${username}||${password}`;

  return crypto
    .createHash('md5')
    .update(token)
    .digest('hex');

}