let mongoose = require('../utils/mongoose'),
    Schema = mongoose.Schema;


let Rubric = new Schema({
    _id: Schema.Types.ObjectId
});
module.exports = mongoose.model('Rubric', Rubric);