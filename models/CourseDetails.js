const mongoose = require('mongoose');

const courseDetailsSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  description: String,
  syllabus: String,
  quiz: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('CourseDetails', courseDetailsSchema);
