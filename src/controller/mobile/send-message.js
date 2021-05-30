const { assistantV2 } = require('../../services/ibm-watson');
const { assistantV1 } = require('../../services/ibm-watson');


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

module.exports = async (req, res, next) => {
  const { inputText } = req.body;

  console.log({ inputText });
  console.log('getting response message from ibm assistant..');

  assistantV1.message({
    // workspaceId: process.env.WATSON_ASSISTANT_SKILL_ID,
    workspaceId: '1568ff62-a9bf-4da2-a8a2-bd0bc442353f',
    // workspaceId: 'b90775b4-8294-40d7-9782-41f0cc69b089',
    MessageInput: {
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