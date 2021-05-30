const { assistantV1 } = require('../../services/ibm-watson');


module.exports = async (req, res, next) => {

  const data = await assistantV1.listDialogNodes({
    workspaceId: process.env.WATSON_ASSISTANT_SKILL_ID,
    // workspaceId: '1568ff62-a9bf-4da2-a8a2-bd0bc442353f',
    // workspaceId: 'b90775b4-8294-40d7-9782-41f0cc69b089',
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