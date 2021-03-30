const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const ibmAssistant = new AssistantV2({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: '60mzzH3G6jx14N9AR1W6IZghkoDNTkNwuwG1QQyfbnYk',
  }),
  serviceUrl: 'https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/6c5d9a7d-f151-4b8b-ab02-5f68ce4b9add',
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
  const { text } = req.body;

  console.log({ text });
  console.log('getting response message from ibm assistant..');

  ibmAssistant.messageStateless({
    assistantId: 'aac005c7-ef62-4a12-ba53-f323d153d1c4',
    input: { 'message_type': 'text', text }
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