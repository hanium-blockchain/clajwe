const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'Users'},
    asset_id: { type: Schema.Types.ObjectId, ref: 'Assets' },
    coin: { type: Number, default: 0},
    createdAt: {type: Date, default: Date.now}

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
});

var Coins = mongoose.model('Coins', schema);
module.exports = Coins;