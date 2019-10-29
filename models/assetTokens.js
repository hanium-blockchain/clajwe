const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
    asset_id: { type:String},
    txhash: { type:String},
    address: { type:String},
    createdAt: {type: Date, default: Date.now},
}, {
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
});

schema.plugin(mongoosePaginate);

var AssetTokens = mongoose.model('AssetTokens', schema);
module.exports = AssetTokens;