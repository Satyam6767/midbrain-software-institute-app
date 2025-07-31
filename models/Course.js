const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  trainer: String,
  image: String,
});
module.exports = mongoose.model('Course', courseSchema);