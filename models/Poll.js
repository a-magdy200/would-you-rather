const {model, Schema} = require('mongoose');
const schema = Schema({
  title: String,
  option1: String,
  option2: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answeredBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  option1Count: {
    type: Number,
    default: 0,
  },
  option2Count: {
    type: Number,
    default: 0,
  },
  totalAnswersCount: {
    type: Number,
    default: 0,
  },
}, {timestamps: true});
const Poll = model('Poll', schema);
module.exports = Poll;
