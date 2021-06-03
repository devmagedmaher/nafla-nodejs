const express = require('express');
const sendMessage = require('../controller/mobile/send-message');
const getDialogs = require('../controller/mobile/get-dialogs');
const getWorkspaces = require('../controller/mobile/get-workspaces');
const workspaceExtractor = require('../middleware/workspace-extractor');

const router = express.Router();

router.get('/', (req, res, next) => res.send({ message: 'ibm-watson api is working !' }));

router.post('/message', workspaceExtractor(), sendMessage);
router.get('/dialogs', workspaceExtractor(), getDialogs);
router.get('/workspaces', getWorkspaces);


module.exports = router;