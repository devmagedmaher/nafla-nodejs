const { assistantV2 } = require('../../services/ibm-watson');


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

  assistantV2.messageStateless({
    assistantId: process.env.WATSON_ASSISTANT_ID,
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