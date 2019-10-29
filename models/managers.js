var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

var schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
  address: {type: String},
  prvKey: {type: String},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
}); 
schema.plugin(mongoosePaginate);
var Hashes = mongoose.model('Hashes', schema);

module.exports = Hashes;