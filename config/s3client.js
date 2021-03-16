const S3Client = require('aws-sdk/clients/s3');
const s3 = new S3Client( {
  params: { Bucket: process.env.S3_BUCKET || ''},
  credentials: {
    secretAccessKey: process.env.S3_ACCESS_KEY_SECRET || '',
    accessKeyId: process.env.S3_ACCESS_KEY_ID || ''
  }
});
module.exports = s3;
