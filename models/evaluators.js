var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'), //이런 식으로 리콰이어를 사용하면 npm 에 들어있는 거라는 것 구글에 검색
    Schema = mongoose.Schema;

var schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
  li_no: {type: String, trim: true, required: true},
  li_Category: {type: String, trim: true, required: true},
  li_date: {type: String, trim: true, required: true},
  li_birth: {type: String, trim: true, required: true},
  li_inner: {type: String, trim: true, required: true},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
schema.plugin(mongoosePaginate);
var Evaluators = mongoose.model('Evaluators', schema);

module.exports = Evaluators;
