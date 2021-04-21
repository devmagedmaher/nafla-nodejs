const { query } = require('express-validator');
const DialogNodeModel = require('../../model/dialog-nodes');
const checkValidator = require('../../middleware/check-validator');


module.exports.getList = [

  /**
   * Validating
   * 
   */
  [
    query('sort').isIn(['updated', '-updated']),
    query('page.number').isInt({ min: 1 }),
    query('page.size').isInt({ min: 1 }),
  ],

  /**
   * check if there is validation errors
   */
  checkValidator,

  /**
   * Handler
   * 
   */
  async (req, res, next) => {  
    try {
      const { page, sort } = req.query;

      const dialogNode = new DialogNodeModel();
      const data = await dialogNode.getList({ page, sort });

      res.send(data);
      
    }
    catch (error) {
      next(error)
    }
  }

]