const { query } = require('express-validator');
const IntentModel = require('../../model/intents');
const checkValidator = require('../../middleware/check-validator');


module.exports.getList = [

  /**
   * Validating
   * 
   */
  [
    query('sort').isIn(['updated', '-updated', 'intent', '-intent']),
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

      const intent = new IntentModel();
      const data = await intent.getList({ page, sort });

      res.send(data);
      
    }
    catch (error) {
      next(error)
    }
  }

]