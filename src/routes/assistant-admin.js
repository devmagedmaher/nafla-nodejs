const express = require('express');
const users = require('../controller/admin/users');
const dialogNodes = require('../controller/admin/dialog-nodes');
const intents = require('../controller/admin/intents');
const auth = require('../middleware/auth');


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
 * Dialog resource
 * 
 */
const dialogNodeRouter = express.Router();
  dialogNodeRouter.get('/', dialogNodes.getList);
  dialogNodeRouter.get('/:id', dialogNodes.getOne);
  dialogNodeRouter.post('/', dialogNodes.create);
  dialogNodeRouter.put('/:id', dialogNodes.update);
  dialogNodeRouter.delete('/:id', dialogNodes.delete);
adminRouter.use('/dialog-nodes', auth(), dialogNodeRouter);


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
adminRouter.use('/intents', auth(), intentRouter);


module.exports = adminRouter;