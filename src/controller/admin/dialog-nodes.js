const DialogNodeModel = require('../../models/dialog-nodes');
const { jsonSchema } = require('../../middleware/jsonSchema');


const dialogNode = new DialogNodeModel();


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
            enum: ['id', 'updated'],
          },
          {
            type: 'string',
            enum: ['ASC', 'DESC'],
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
      const { result, headers } = await dialogNode.getList(req.query);

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

    const { result } = await dialogNode.getOne(id);

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
      title: { type: 'string' },
      description: { type: 'string' },
      conditions: { type: 'string' },
    },
    required: ['title'],
  }),

  async (req, res, next) => {
    try {
      const { result } = await dialogNode.create(req.body);

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
      title: { type: 'string' },
      description: { type: 'string' },
      conditions: { type: 'string' },
      respond: {
        type: 'object',
        properties: {
          response_type: {
            type: 'string',
            enum: ['text']
          },
          selection_policy: {
            type: 'string',
            enum: ['sequential', 'random', 'multiline']
          },
          values: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                text: { type: 'string' },
              },
              required: ['text'],
            },
          },
        },
        required: ['response_type', 'selection_policy'],
      },
    },
  }),

  async (req, res, next) => {
    try {
      const { id } = req.params;

      const { result } = await dialogNode.update(req.body, id);

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

    const { result } = await dialogNode.delete(id);

    res.send(result);
  }
  catch (error) {
    next(error);
  }
}