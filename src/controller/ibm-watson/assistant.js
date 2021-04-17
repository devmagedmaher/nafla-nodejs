const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const ibmAssistant = new AssistantV2({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: '2nsrLIeq69MDb2D91iWPjAm_ABhnZO-gYMVFnOnfNi9e',
  }),
  serviceUrl: 'https://api.eu-de.assistant.watson.cloud.ibm.com/instances/a689a3cd-3735-415d-bacb-3732717d2eed',
});


const proccessResponse = async ({ result }) => {
  const generic = result.output.generic[0];
  console.log({ generic });
  if (generic.response_type === 'text'){
    return generic.text;
  }
  else {
    // response type is suggestion or anything else..
    
    return 'آسف ، لم أفهمك!';
  }
}

const assistant = async (req, res, next) => {
  const { inputText } = req.body;

  console.log({ inputText });
  console.log('getting response message from ibm assistant..');

  ibmAssistant.messageStateless({
    assistantId: '5e9adecf-4700-4133-a84d-d5d8dfb2ca1c',
    input: {
      'message_type': 'text',
      text: inputText
    }
  })

    .then(proccessResponse)

    .then(message => {
      console.log({ message });
      res.json({ message });
    })

    .catch(error => {
      console.log({ error });
      res.status(500);
      res.json({ message: 'حدث خطأ ما!' });
    })

}


module.exports = assistant;