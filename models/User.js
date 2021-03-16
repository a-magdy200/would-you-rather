const {model, Schema} = require('mongoose');
const schema = Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  profilePicture: {
    type: String,
    default: 'https://would-you-rather.s3.eu-west-3.amazonaws.com/default-user-image-png-8-Transparent-Images-1.png'
  },
  createdPolls: [{
    type: Schema.Types.ObjectId,
    ref: 'Poll',
    default: []
  }],
  answeredPolls: [{
    type: Schema.Types.ObjectId,
    ref: 'Poll',
    default: []
  }],
  score: {
    type: Number,
    default: 0
  },
}, {timestamp: true});
const User = model('User', schema);
module.exports = User;
