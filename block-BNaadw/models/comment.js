const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    articleId: { type: Schema.Types.ObjectId, ref: 'Article'},
    comment: String
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema);