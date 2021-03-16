const {model, Schema} = require('mongoose');
const schema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  pollId: {
    type: Schema.Types.ObjectId,
    ref: 'Poll'
  },
  answer: {
    type: String,
    required: true
  }
}, {timestamps: true});
const UserPollAnswer = model('UserPollAnswer', schema);
module.exports = UserPollAnswer;
