const AWS = require('aws-sdk');

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: 'AKIAZNCLS53IOBY3FSIN',
  secretAccessKey: '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',
  region: 'eu-west-1',
});


const uploadFile = (body, filename) => {

  return s3.putObject({
    Body: body,
    Bucket: "nfla", 
    Key: filename,
    ContentEncoding: 'base64',
    ContentType: 'audio/wav',
    ACL:'public-read'
   }, (error, data) => {
     if (error) console.log({ error });
     else console.log({ data });
   })
  
};


const fileExists = (filename) => new Promise((res, rej) => {

  s3.getObject({
    Bucket: 'nfla',
    Key: filename,
  }, (error, data) => {
    if (error) {
      if (error.statusCode === 404) {
        console.log('not found');
        res(false);
      }
      else {
        console.log({ error });
      }
    }
    else {
      res(true);
      console.log('found');
    }
  })
  
});


module.exports.uploadFile = uploadFile;
module.exports.fileExists = fileExists;