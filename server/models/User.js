const {model, Schema} = require('mongoose');
const schema = Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  profilePicture: {
    type: String,
    default: 'http://picsum.photos/200'
  },
  createdPolls: [{
    type: Schema.Types.ObjectId,
    ref: 'Poll'
  }],
  answeredPolls: [{
    type: Schema.Types.ObjectId,
    ref: 'Poll'
  }],
  score: {
    type: Number,
    default: 0
  },
}, {timestamp: true});
const User = model('User', schema);
module.exports = User;
