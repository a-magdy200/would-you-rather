var express = require('express');
var router = express.Router();
const User = require('../models/User');
const validator = require('validator');
const mongoose = require('mongoose');
const s3client = require('../config/s3client');
const {verifyAndGetID, decodeJWT, getFileExtension, comparePassword, hashPassword, generateJWT} = require('../config/helpers');
/* GET users listing. */
router.post('/sign-up', async function(req, res) {
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
    res.json({profile: {...savedUser._doc, password: undefined}, token});
  } catch ({message}) {
    res.json({error: message});
  }
});
router.put('/', async function(req, res) {
  let {firstname, lastname, email} = req.body;
  try {
    if (!validator.isEmail(email)) {
      throw new Error('Invalid email');
    }
    let _id = await verifyAndGetID(req.header('Authorization'));
    let user = await User.findById(_id);
    if (!user) {
      throw new Error('User not found.');
    }
    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    await user.save();
    res.sendStatus(200);
  } catch ({message}) {
    res.json({error: message});
  }
});
router.put('/change-password', async function(req, res) {
  let {newPassword} = req.body;
  try {
    let _id = await verifyAndGetID(req.header('Authorization'));
    let user = await User.findById(_id);
    if (!user) {
      throw new Error('User not found.');
    }
    user.password = await hashPassword(newPassword);
    await user.save();
    res.sendStatus(200);
  } catch ({message}) {
    res.json({error: message});
  }
});
router.post('/upload-image', async function(req, res) {
  try {
    let _id = await verifyAndGetID(req.header('Authorization'));
    let user = await User.findById(_id);
    if (!user) {
      throw new Error('User not found.');
    }
    const image = req.files.image;

    const fileName = _id + '_' + new Date().getTime() + '.' + getFileExtension(image.name);
    // const fileType = req.query['jpg/jpeg'];
    const s3Params = {
      Bucket: process.env.S3_BUCKET || '',
      Key: fileName,
      // Expires: 60,
      ContentType: image.mimetype,
      ACL: 'public-read',
      Body: image.data
    };
    const oldUrl = user.profilePicture.split('/');
    const s3DeleteParams = {
      Bucket: process.env.S3_BUCKET || '',
      Key: oldUrl[oldUrl.length - 1],
    }
    s3client.deleteObject(s3DeleteParams, ((err, data) => {
      s3client.putObject(s3Params, async (err, data) => {
        const url = `https://${process.env.S3_BUCKET || ''}.s3.${process.env.S3_DEFAULT_REGION || ''}.amazonaws.com/${fileName}`;
        user.profilePicture = url;
        await user.save();
        res.send(url);
      });
    }));
    // res.sendStatus(200);
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
router.post('/sign-in', async function(req, res) {
  let {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if (user) {
      let {_id} = user;
      if (await comparePassword(password, user.password)) {
        let token = generateJWT({_id});
        res.json({
          profile: {
            ...user._doc,
            password: undefined
          },
          token,
        });
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
