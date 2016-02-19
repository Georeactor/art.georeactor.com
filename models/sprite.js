const mongoose = require('mongoose');

var spriteSchema = mongoose.Schema({
  name: String,
  images: [String]
});

module.exports = mongoose.model('Sprite', spriteSchema);
