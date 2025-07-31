const mongoose = require('mongoose');

const syllabusSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  moduleTitle: {
    type: String,
    required: true,
  },
  topics: [
    {
      topicTitle: { type: String, required: true },
      subtopics: [{ type: String }],
      readingMaterial: [{ type: String }],
      order: { type: Number, default: 0 },
    }
  ],
  overallDuration: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Syllabus', syllabusSchema);
