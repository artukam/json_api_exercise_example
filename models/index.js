var mongoose = require('mongoose')
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/json_api_ex')
mongoose.Promise = Promise;

module.exports.User = require("./user")