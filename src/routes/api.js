const express = require('express');
const ibmWatsonRouter = require('./ibm-watson');
const assistantAdminRouter = require('./assistant-admin');
const allowHeaders = require('../middleware/allow-headers');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.send({ message: 'Api is working fine.' });
});


// ibm watson api routes
router.use('/ibm-watson', ibmWatsonRouter);

// ibm watson assistant admin api routes
router.use('/admin', allowHeaders, assistantAdminRouter);


module.exports = router;
