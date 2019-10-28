var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  asset_id: { type: Schema.Types.ObjectId, ref: 'Assets' },
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
  value: {type: Number, default: 0},
  value2coin: {type: Number, default:0},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
var Values = mongoose.model('Values', schema);

module.exports = Values;
