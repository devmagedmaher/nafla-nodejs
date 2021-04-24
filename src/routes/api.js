const express = require('express');
const ibmWatsonRouter = require('./ibm-watson');
const users = require('../controller/admin/users'); 
const assistantAdminRouter = require('./assistant-admin');
const auth = require('../middleware/auth');
const allowHeaders = require('../middleware/allow-headers');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.send({ message: 'Api is working fine.' });
});


// ibm watson api routes
router.use('/ibm-watson', ibmWatsonRouter);

/**
 * Users authentication
 * 
 */
router.post('/users/auth', users.auth);

// ibm watson assistant admin api routes
router.use('/admin', auth(), allowHeaders, assistantAdminRouter);


module.exports = router;
