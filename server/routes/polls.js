const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');
const User = require('../models/User');
const UserPollAnswer = require('../models/UserPollAnswer');
const {decodeJWT} = require("../config/helpers");
const mongoose = require('mongoose');
router.get('/', async (req, res) => {
  try {
    let polls = await Poll.find();
    res.json(polls);
  } catch ({message}) {
    res.json({error: message});
  }
})

router.post('/', async (req, res) => {
  try {
    let {title, option1, option2} = req.body;
    let token = req.header('Authorization').split(' ')[1];
    let {data} = await decodeJWT(token);
    let {_id} = data;
    let poll = new Poll({
      title,
      option1,
      option2,
      createdBy: _id
    });
    poll = await poll.save();
    let user = await User.findById(_id);
    user.score++;
    user.createdPolls.push(mongoose.Types.ObjectId(pollId));
    await user.save();
    res.json({...poll._doc});
  } catch ({message}) {
    res.json({error: message});
  }
});
router.post('/answer', async (req, res) => {
  try {
    let {option, pollId} = req.body;
    let token = req.header('Authorization').split(' ')[1];
    let {data} = await decodeJWT(token);
    let {_id} = data;
    let pollAnswer = new UserPollAnswer({
      userId: mongoose.Types.ObjectId(_id),
      pollId: mongoose.Types.ObjectId(pollId),
      answer: option
    });
    pollAnswer = await pollAnswer.save();
    let user = await User.findById(_id);
    user.score++;
    user.answeredPolls.push(mongoose.Types.ObjectId(pollId));
    await user.save();
    let poll = await Poll.findById(pollId);
    poll.answeredBy.push(mongoose.Types.ObjectId(_id));
    await poll.save();
    res.json({...pollAnswer._doc});
  } catch ({message}) {
    res.json({error: message});
  }
});
module.exports = router;
