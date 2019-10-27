const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
    address: { type: String, trim: true, required: true },
    category: { type: String, trim: true, require: true },
    asset_no: { type: Number, default:0, required: true },
    asset_name: { type: String, trim: true, required: true},
    area: { type:String, trim: true, required: true},
    completion_date: { type:String, required: true},
    description: { type: String, trim: true, required: true },
    date: { type: Date, default: Date.now },
    end_date: { type: String, required: true},
    is_evaluate: { type: Boolean, default: false},
    is_approved: { type: Boolean, default: false},
    picture: { type: String },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

schema.plugin(mongoose.mongoosePaginate);
var Assets = mongoose.model('Assets', schema);

module.exports = Assets;