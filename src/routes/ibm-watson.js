const express = require('express');
const {
  textToSpeech, 
  assistant,
} = require('../controller/ibm-watson');

const router = express.Router();

router.get('/', (req, res, next) => res.send({ message: 'ibm-watson api is working !' }));
router.post('/text-to-speech', textToSpeech);
router.post('/assistant', assistant);


module.exports = router;