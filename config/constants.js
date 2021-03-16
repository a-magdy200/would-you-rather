let dbName = process.env.DB_DEV_DB_NAME || '';
if (process.env.ENVIRONMENT === 'production') {
  dbName = process.env.DB_PROD_DB_NAME || '';
}
const saltRounds = 10;
const appSecret = process.env.APP_SECRET || '';
module.exports = {
  dbName,
  saltRounds,
  appSecret
}
