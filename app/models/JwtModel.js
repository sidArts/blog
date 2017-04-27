var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JwtModel = new Schema({
    token: { type: String, required: true},
    lastAccessed: { type: Date, required: true},
});

var JwtModel = mongoose.model('Jwt', JwtModel);

module.exports = JwtModel;
