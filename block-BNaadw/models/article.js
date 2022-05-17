const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {type:String, unique:true },
    description: String,
    likes: {type: Number, default:0},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    author: String,
    slug: String
},{timestamps: true})

articleSchema.pre('save', function(next){
    let titleArr = this.title.split(' ');
    this.slug = titleArr.join('-');
    next();
})

module.exports = mongoose.model('Article', articleSchema);