var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  address: {type: String, required: true},
  txhash: {type: String, required: true},
  value: {type: Number},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
}); 
var Managers = mongoose.model('Managers', schema);

module.exports = Managers;