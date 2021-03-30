const express = require('express');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.send({ message: 'Api is working fine.' });
});

const ibmWatsonRouter = require('./ibm-watson');

// ibm watson api routes
router.use('/ibm-watson', ibmWatsonRouter);

module.exports = router;
