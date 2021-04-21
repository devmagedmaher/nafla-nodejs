const AssistantV1 = require('ibm-watson/assistant/v1');
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');


const version = process.env.WATSON_ASSISTANT_VERSION;
const apikey = process.env.WATSON_ASSISTANT_API_KEY;
const serviceUrl = process.env.WATSON_ASSISTANT_SERVICE_URL;


const config = {
  version,
  authenticator: new IamAuthenticator({
    apikey,
  }),
  serviceUrl,
};


module.exports.assistantV1 = new AssistantV1(config);

module.exports.assistantV2 = new AssistantV2(config);