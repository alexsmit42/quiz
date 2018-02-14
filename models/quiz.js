let mongoose = require('../utils/mongoose'),
    Schema = mongoose.Schema,
    utils = require(__base + '/utils');

require('transliteration');

let Quiz = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    type: String,
    lang: String,
    options: Schema.Types.Mixed,
    createDate: { type: Date, default: Date.now() },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Test.virtual('urlTitle').get(function() {
//     return utils.getTranslit(this.title);
// });

// Test.pre('save', function() {
//     this.url = utils.getTranslit(this.title);
// });

module.exports = mongoose.model('Quiz', Quiz);