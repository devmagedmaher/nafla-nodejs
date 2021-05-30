const express = require('express');
const sendMessage = require('../controller/mobile/send-message');
const getDialogs = require('../controller/mobile/get-dialogs');

const router = express.Router();

router.get('/', (req, res, next) => res.send({ message: 'ibm-watson api is working !' }));

router.post('/message', sendMessage);
router.get('/dialogs', getDialogs);


module.exports = router;