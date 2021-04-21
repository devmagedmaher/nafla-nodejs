const IBMAssistantModel = require('./index');


class IntentModel extends IBMAssistantModel {

  /**
   * constructor
   * 
   */
  constructor(props) {
    super({
      type: 'intents',
      responseKey: 'intents',
      idFieldName: 'intent',
      attributes: ['intent', 'description', 'examples', 'created', 'updated'],
      defaultOptions: {
        workspaceId: process.env.WATSON_ASSISTANT_SKILL_ID,
        includeAudit: true,
        includeCount: true,
        _export: true,
      },
      methodNames: {
        getList: 'listIntents',
      }
    })
  }

}


module.exports = IntentModel;