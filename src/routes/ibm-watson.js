const express = require('express');
const assistant = require('../controller/ibm-watson/assistant');
const dialog = require('../controller/ibm-watson/dialog');

const router = express.Router();

router.get('/', (req, res, next) => res.send({ message: 'ibm-watson api is working !' }));
router.post('/assistant', assistant);
router.get('/dialog', dialog);


module.exports = router;