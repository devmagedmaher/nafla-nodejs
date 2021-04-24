const express = require('express');
const dialogNodes = require('../controller/admin/dialog-nodes');
const intents = require('../controller/admin/intents');

const router = express.Router();


/**
 * Dialog resource
 * 
 */
router.get('/dialog-nodes', dialogNodes.getList);
router.get('/dialog-nodes/:id', dialogNodes.getOne);
router.post('/dialog-nodes', dialogNodes.create);
router.put('/dialog-nodes/:id', dialogNodes.update);
router.delete('/dialog-nodes/:id', dialogNodes.delete);

/**
 * Intents resource
 * 
 */
router.get('/intents', intents.getList);
router.get('/intents/:id', intents.getOne);
router.post('/intents', intents.create);
router.put('/intents/:id', intents.update);
router.delete('/intents/:id', intents.delete);


module.exports = router;