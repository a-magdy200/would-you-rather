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

module.exports = {
  generateJWT,
  decodeJWT,
  hashPassword,
  comparePassword
}
