const WorkspaceModel = require('../../models/workspaces');


const workspace = new WorkspaceModel();

module.exports = async (req, res, next) => {  
  try {
    const { result } = await workspace.getList(req.query);

    res.send(result);
  }
  catch (error) {
    next(error)
  }
}