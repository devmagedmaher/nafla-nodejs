const IBMAssistantModel = require('./index');
const { assistantV1 } = require('../services/ibm-watson');


class DialogNodeModel extends IBMAssistantModel {

  /**
   * constructor
   * 
   */
  constructor(props) {
    super({
      type: 'dialog-nodes',
      responseKey: 'dialog_nodes',
      idFieldName: 'dialog_node',
      attributes: ['dialog_node', 'description', 'conditions', 'metadata', 'title', 'type', 'user_label', 'created', 'updated'],
      defaultOptions: {
        workspaceId: process.env.WATSON_ASSISTANT_SKILL_ID,
        includeAudit: true,
        includeCount: true,
      },
      methodNames: {
        getList: 'listDialogNodes',
      },
    });
  }

}


module.exports = DialogNodeModel;