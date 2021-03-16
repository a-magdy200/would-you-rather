const mongoose = require('mongoose');
let uri = process.env.DB_DEV_URL || '';
let dbName = process.env.DB_DEV_DB_NAME || '';
let dbUsername = process.env.DB_DEV_USERNAME || '';
let dbPassword = process.env.DB_DEV_PASSWORD || '';
if (process.env.ENVIRONMENT === 'production') {
  uri = process.env.DB_PROD_URL;
  dbName = process.env.DB_PROD_DB_NAME;
  dbPassword = process.env.DB_PROD_PASSWORD;
  dbUsername = process.env.DB_PROD_USERNAME;
}
uri = uri.replace('DB_USERNAME', dbUsername).replace('DB_PASSWORD', dbPassword).replace('DB_NAME', dbName);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
module.exports = mongoose;

