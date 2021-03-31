const express = require('express');
const {
  assistant,
} = require('../controller/ibm-watson');

const router = express.Router();

router.get('/', (req, res, next) => res.send({ message: 'ibm-watson api is working !' }));
router.post('/assistant', assistant);


module.exports = router;