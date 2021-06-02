const WorkspaceModel = require('../../models/workspaces');
const { jsonSchema } = require('../../middleware/jsonSchema');


const workspace = new WorkspaceModel();


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
            enum: ['id', 'updated', 'name'],
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
      const { result, headers } = await workspace.getList(req.query);

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
 * GET ONE Workspace
 */
 module.exports.getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { result } = await workspace.getOne(id);

    res.send(result);
  }
  catch (error) {
    next(error);
  }
}
