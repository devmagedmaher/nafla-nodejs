

module.exports = () => {

  return (req, res, next) => {
    const ws = req.get('Workspace-Id');
    
    if (ws) {
      res.locals.workspaceId = ws;
    }

    next();
  }

}