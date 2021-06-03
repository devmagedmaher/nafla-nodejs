const { assistantV1 } = require('../../services/ibm-watson');


module.exports = async (req, res, next) => {
  const { workspaceId } = res.locals;

  console.log({workspaceId});
  const data = await assistantV1.listDialogNodes({
    workspaceId,
  }).then(response => response.result.dialog_nodes)

  // filter dialog nodes with common conditions
    .then(nodes => nodes.filter(node => node.metadata && node.metadata.visible))
  
  // map dialog nodes to { id, text } object
    .then(nodes => nodes.map(node => ({
      id: node.dialog_node,
      text: node.title
    })));

  res.json(data);
}