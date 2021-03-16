const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {appSecret, saltRounds} = require('./constants');
const generateJWT = data => jwt.sign({data}, appSecret, {
  expiresIn: '1y',
  algorithm: 'HS512'
});
const decodeJWT = token => jwt.verify(token, appSecret);
const hashPassword = async password => await bcrypt.hash(password, saltRounds);

const comparePassword = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);
const verifyAndGetID = async (header) => {
  let token = header.split(' ')[1];
  if (token) {
    let {data} = await decodeJWT(token);
    let {_id} = data;
    return _id;
  }
  return null;
};
const getFileExtension = fileName => {
  let fileParts = fileName.split('.');
  return fileParts[fileParts.length - 1].toLowerCase();
}
module.exports = {
  generateJWT,
  decodeJWT,
  hashPassword,
  comparePassword,
  verifyAndGetID,
  getFileExtension
}
