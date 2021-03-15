var express = require('express');
var router = express.Router();
const User = require('../models/User');
const validator = require('validator');
const {decodeJWT, comparePassword, hashPassword, generateJWT} = require('../config/helpers');
/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await User.find();
  res.json({users});
  // res.send('respond with a resource');
});
router.post('/', async function(req, res) {
  let {firstname, lastname, email, password} = req.body;
  try {
    if (!validator.isEmail(email)) {
      throw new Error('Invalid email');
    }
    let existedUser = await User.findOne({email});
    if (existedUser) {
      throw new Error('Email already exists.');
    }
    let user = new User({
      firstname: firstname,
      lastname: lastname,
      email: email
    });
    user.password = await hashPassword(password);
    let savedUser = await user.save();
    let token = generateJWT({_id: savedUser._id});
    res.json({profile: {firstname, lastname, email, profilePicture: savedUser.profilePicture}, token});
  } catch ({message}) {
    res.json({error: message});
  }
});
router.post('/verify', async function(req, res) {
  let {token} = req.body;
  try {
    res.json(decodeJWT(token));
  } catch ({message}) {
    res.json({error: message});
  }
});
router.post('/signin', async function(req, res) {
  let {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if (user) {
      let {firstname, lastname, profilePicture, _id} = user;
      if (await comparePassword(password, user.password)) {
        let token = generateJWT({_id});
        res.json({firstname, lastname, profilePicture, token});
      } else {
        throw new Error('Invalid email/password');
      }
    } else {
      throw new Error('Invalid email/password');
    }
  } catch ({message}) {
    res.json({error: message});
  }
});
module.exports = router;
