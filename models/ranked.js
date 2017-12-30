var mongoose = require('../utils/mongoose'),
    Schema = mongoose.Schema;

var Ranked = new Schema({
    _id: Schema.Types.ObjectId,
    question: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    order: {
        type: String,
        required: true,
        default: 'numeric'
    },
    answers: [{
        caption: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }],
    test: {
        type: Schema.Types.ObjectId,
        ref: 'Test'
    }
});

module.exports = mongoose.model('Ranked', Ranked);