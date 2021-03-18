const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');
const User = require('../models/User');
const UserPollAnswer = require('../models/UserPollAnswer');
const mongoose = require('mongoose');
const {verifyAndGetID} = require("../config/helpers");
router.get('/', async (req, res) => {
  try {
    let polls = await Poll.find();//.sort({createdAt: -1}).populate('createdBy', '-password');
    res.json(polls);
  } catch ({message}) {
    throw new Error(message);
  }
});

router.get('/leaderboard', async function(req, res, next) {
  let users = await User.find().sort({score: -1}).select('-password').limit(3);
  res.json(users);
});
router.get('/my-polls', async (req, res) => {
  try {
    let _id = await verifyAndGetID(req.header('Authorization'));
    let polls = await Poll.find({createdBy: mongoose.Types.ObjectId(_id)}).sort({createdAt: -1});
    res.json(polls);
  } catch ({message}) {
    throw new Error(message);
  }
});
router.get('/:pollId', async (req, res) => {
  try {
    let {pollId} = req.params;
    let _id = await verifyAndGetID(req.header('Authorization'));
    let answerDetails = {};
    let isValidId = mongoose.Types.ObjectId.isValid(pollId);
    if (!isValidId) {
      throw new Error('Not a valid ID');
    }
    if (_id) {
      answerDetails = await UserPollAnswer.findOne({userId: _id, pollId}).select('answer');
    }
    let pollDetails = await Poll.findById(pollId).populate('createdBy', '-password');
    if (pollDetails) {
      res.json({pollDetails, answerDetails});
    } else {
      throw new Error('Poll not found.');
    }
  } catch ({message}) {
    res.json({error: message});
  }
});


router.post('/', async (req, res) => {
  try {
    let {title, option1, option2} = req.body;
    let _id = await verifyAndGetID(req.header('Authorization'));
    let poll = new Poll({
      title,
      option1,
      option2,
      createdBy: _id
    });
    poll = await poll.save();
    let user = await User.findById(_id);
    user.score++;
    user.createdPolls.push(mongoose.Types.ObjectId(poll._id));
    await user.save();
    res.json({...poll._doc});
  } catch ({message}) {
    throw new Error(message);
  }
});
router.post('/answer', async (req, res) => {
  try {
    let {answer, pollId} = req.body;
    let _id = await verifyAndGetID(req.header('Authorization'));
    let pollAnswer = new UserPollAnswer({
      userId: mongoose.Types.ObjectId(_id),
      pollId: mongoose.Types.ObjectId(pollId),
      answer
    });
    pollAnswer = await pollAnswer.save();
    let user = await User.findById(_id);
    user.score++;
    user.answeredPolls.push(mongoose.Types.ObjectId(pollId));
    await user.save();
    let poll = await Poll.findById(pollId);
    poll.answeredBy.push(mongoose.Types.ObjectId(_id));
    if (answer === poll.option1) {
      poll.option1Count++;
    } else {
      poll.option2Count++;
    }
    poll.totalAnswersCount++;
    await poll.save();
    res.json({...pollAnswer._doc});
  } catch ({message}) {
    throw new Error(message);
  }
});
module.exports = router;
