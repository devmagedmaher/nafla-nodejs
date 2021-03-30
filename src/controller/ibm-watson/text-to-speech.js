const crypto = require('crypto');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const { uploadFile, fileExists } = require('../../services/s3');


const tts = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: 'wW1vfdXF6-SgCj3_YHT3peDm6znwm33yBghyhN7SbsNk',
  }),
  serviceUrl: 'https://api.eu-gb.text-to-speech.watson.cloud.ibm.com/instances/43a2d9f5-21e8-4e90-be92-fdc15ad0c3cf',
});


const checkAudioFileExists = fileName => {

  console.log('searching for the audio file..')

  return fileExists(fileName)

    .then(fileExists => ({ fileExists }));

};


const geSpeechFromText = ({ params, dirPath, fileName}) => {
  console.log('getting voice from ibm watson..')
  return tts.synthesize(params)
    .then(response => {
      console.log('got the voice');
      console.log('preparing file..');
      return tts.repairWavHeaderStream(response.result);
    })
    .then(buffer => {
      console.log('writing file..');
      // fs.writeFileSync(dirPath + fileName, buffer);
      uploadFile(buffer, fileName);
      Promise.resolve(true);
    })
}


const textToSpeech = (req, res, next) => {
  const { text } = req.body;
  console.log({ text });
  if (!text) {
    res.status(400);
    res.json({ messasge: '`text` must not be empty.' });
    return;
  }

  const textHash = crypto.createHash('sha256').update(text).digest('hex');
  const fileName = textHash + '.wav';
  const dirPath = 'public/audio/';
  const filePath = dirPath + fileName;
  const baseUrl = 'https://nfla.s3-eu-west-1.amazonaws.com/';
  

  // check if there is already a voice with the same text
  return checkAudioFileExists(fileName)

  // if file exists: send the url, else: continue to ibm-watson
    .then(({ fileExists }) => {
      console.log({ fileExists });
      if (fileExists) {
        console.log('sending audio url..');
        res.json({
          url: baseUrl + fileName
        });
      }
      return { stopProcess: fileExists };
    })

    .then(({ stopProcess }) => {
      console.log({ stopProcess });
      if (!stopProcess) {
        const options = {
          params: {
            text,
            accept: 'audio/wav',
            voice: 'ar-MS_OmarVoice'
          },
          dirPath,
          fileName,
        }
        return geSpeechFromText(options)
          .then(() => {
            console.log('sending audio url..');
            res.json({
              url: baseUrl + fileName
            });
          })
      }
    })

    .catch(error => {
      console.log({ error });
      res.status(500);
      res.send({ message: 'Something went wrong!' });
    });
}


module.exports = textToSpeech;