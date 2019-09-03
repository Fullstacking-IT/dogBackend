const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: String
});

module.exports = mongoose.model('Dog', dogSchema);
