

module.exports = () => {
  
  return (req, res, next) => {
    const auth = req.get('Authorization');
    console.log({ auth });

    if (auth) {
      const [username, password] = auth.replace('Bearer ', '').split('|||');
      if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
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