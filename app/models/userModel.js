var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: String,
    phone: String,
    description: String,
    createdAt: Date,
    updatedAt:{ type: Date, default: Date.now },
    isActive: Boolean
});

var User = mongoose.model('user', userModel);

module.exports = User;
