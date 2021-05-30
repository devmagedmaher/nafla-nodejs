const { assistantV1 } = require('../../services/ibm-watson');


module.exports = async (req, res, next) => {

  const data = await assistantV1.listDialogNodes({
    workspaceId: process.env.WATSON_ASSISTANT_SKILL_ID,
  }).then(response => response.result.dialog_nodes)

  // filter dialog nodes with common conditions
    .then(nodes => nodes.filter(node => {
      if (node.conditions === 'welcome' || node.conditions === 'anything_else') {
        return false
      }
      return true;
    }))
  
  // map dialog nodes to { id, text } object
    .then(nodes => nodes.map(node => ({
      id: node.dialog_node,
      text: node.title
    })));

  res.json(data);
}