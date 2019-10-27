const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim: true}, //required 필수 입력
  pwd: {type: String},
  email: {type: String, required: true, unique: true, trim: true},
  is_evaluator: {type: Boolean},
  is_manager: {type: Boolean},
  signDate: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

schema.methods.generateHash = function(pwd) {
  return bcrypt.hash(pwd, 10); // return Promise
};

schema.methods.validatePassword = function(pwd) {
  return bcrypt.compare(pwd, this.pwd); // return Promise
};

var Users = mongoose.model('Users', schema);

module.exports = Users;
