const express = require('express');
const AppRouter = require('./mobile');
const AdminRouter = require('./admin');
const allowHeaders = require('../middleware/allow-headers');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.send({ message: 'Api is working fine.' });
});


// ibm watson App api routes
router.use('/mobile', AppRouter);


// ibm watson Admin api routes
router.use('/admin', allowHeaders, AdminRouter);


module.exports = router;
