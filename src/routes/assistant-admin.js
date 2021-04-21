const express = require('express');
const dialogNodes = require('../controller/admin/dialog-nodes');
const intents = require('../controller/admin/intents');

const router = express.Router();


/**
 * Dialog resource
 */
router.get('/dialog-nodes', dialogNodes.getList);

/**
 * Intents resource
 */
router.get('/intents', intents.getList);


module.exports = router;