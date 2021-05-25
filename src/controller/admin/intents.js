const IntentModel = require('../../models/intents');
const { jsonSchema } = require('../../middleware/jsonSchema');


const intent = new IntentModel();


/**
 * GET LIST of Dialog Nodes
 * 
 */
module.exports.getList = [

  jsonSchema('query', {
    properties: {
      filter: { type: 'object' },
      range: {
        type: 'array',
        minItems: 2,
        maxItems: 2,
        items: {
          type: 'number',
          minimum: 0,
        },
      },
      sort: {
        type: 'array',
        minItems: 2,
        maxItems: 2,
        items: [
          {
            type: 'string',
            enum: ['id', 'updated', 'intent'],
          },
        ],
      },
      filter: {
        type: 'object',
      },
    },
  }),

  async (req, res, next) => {  
    try {
      const { result, headers } = await intent.getList(req.query);

      if (headers) {
        res.header('Content-Range', headers['Content-Range']);
      }

      res.send(result);
    }
    catch (error) {
      next(error)
    }
  }

];


/**
 * GET ONE Dialog Node
 */
module.exports.getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { result } = await intent.getOne(id);

    res.send(result);
  }
  catch (error) {
    next(error);
  }
}


/**
 * CREATE Dialog Node
 */
module.exports.create = [

   jsonSchema('body', {
    properties: {
      intent: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['intent'],
  }),

  async (req, res, next) => {
    try {
      const { result } = await intent.create(req.body);

      res.send(result);      
    }
    catch (error) {
      next(error)
    }
  }

];


/**
 * UPDATE Dialog Node
 * 
 */
module.exports.update = [

  jsonSchema('body', {
    properties: {
      intent: { type: 'string' },
      description: { type: 'string' },
      examples: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            text: { type: 'string' },
          },
        },
      },
    },
  }),

  async (req, res, next) => {
    try {
      const { id } = req.params;

      const { result } = await intent.update(req.body, id);

      res.send(result);
    }
    catch (error) {
      next(error);
    }
  }

];



module.exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { result } = await intent.delete(id);

    res.send(result);
  }
  catch (error) {
    next(error);
  }
}