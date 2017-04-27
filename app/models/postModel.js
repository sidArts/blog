var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: { type: String, required: true },
    subtitle: String,
    description: { type: String, required: true },
    createdBy: { type: Schema.ObjectId, ref: "user" },
    createdAt: Date,
    updatedAt:{ type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
});

var Post = mongoose.model('post', postSchema);

module.exports = Post;
