var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    postId: Schema.ObjectId,
    description: String,
    createdAt: Date,
    updatedAt: { type: Date, default: Date.now },
    createdBy: Schema.ObjectId
});

var Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;