const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim: true}, //required 필수 입력
  password: {type: String},
  email: {type: String, required: true, unique: true, trim: true},
  is_evaluator: {type: Boolean},
  is_manager: {type: Boolean},
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

schema.methods.generateHash = function(password) {
  return bcrypt.hash(password, 10); // return Promise
};

schema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password); // return Promise
};

var Users = mongoose.model('Users', schema);

module.exports = Users;
