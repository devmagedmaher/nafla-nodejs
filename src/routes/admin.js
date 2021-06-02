const express = require('express');
const users = require('../controller/admin/users');
const dialogNodes = require('../controller/admin/dialog-nodes');
const workspaces = require('../controller/admin/workspaces');
const intents = require('../controller/admin/intents');
const auth = require('../middleware/auth');
const workspaceExtractor = require('../middleware/workspace-extractor');


const adminRouter = express.Router();

adminRouter.get('/', (req, res, next) => {
  res.send({ message: 'Admin api is working fine.' });
});


/**
 * Users authentication
 * 
 */
adminRouter.post('/auth', users.auth);


/**
 * Workspace resource
 * 
 */
const workspaceRouter = express.Router();
  workspaceRouter.get('/', workspaces.getList);
  workspaceRouter.get('/:id', workspaces.getOne);
adminRouter.use('/workspaces', auth(), workspaceRouter);


/**
 * Dialog resource
 * 
 */
const dialogNodeRouter = express.Router();
  dialogNodeRouter.get('/', dialogNodes.getList);
  dialogNodeRouter.get('/:id', dialogNodes.getOne);
  dialogNodeRouter.post('/', dialogNodes.create);
  dialogNodeRouter.put('/:id', dialogNodes.update);
  dialogNodeRouter.delete('/:id', dialogNodes.delete);
adminRouter.use('/dialog-nodes', auth(), workspaceExtractor(), dialogNodeRouter);


/**
 * Intents resource
 * 
 */
const intentRouter = express.Router();
  intentRouter.get('/', intents.getList);
  intentRouter.get('/:id', intents.getOne);
  intentRouter.post('/', intents.create);
  intentRouter.put('/:id', intents.update);
  intentRouter.delete('/:id', intents.delete);
adminRouter.use('/intents', auth(), workspaceExtractor(), intentRouter);


module.exports = adminRouter;