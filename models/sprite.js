const mongoose = require('mongoose');

var spriteSchema = mongoose.Schema({
  name: String,
  images: Object,
  width: Number,
  height: Number
});

module.exports = mongoose.model('Sprite', spriteSchema);
