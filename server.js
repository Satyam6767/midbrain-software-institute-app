const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Midbrains Backend Running");
});

// Import Routes
const courseRoutes = require('./routes/courseRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const courseDetailsRoutes = require('./routes/courseDetailsRoutes');
const quizRoutes = require('./routes/quizRoutes'); 
const quizScoreRoutes = require('./routes/quizScoreRoutes');
const profileRoutes = require('./routes/profileRoutes');
const syllabusRoutes = require('./routes/syllabusRoutes');
const interviewQsRoutes = require('./routes/interviewQuestions');



// Use Routes
app.use('/api/courses', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/coursedetails', courseDetailsRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/quizscore', quizScoreRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/syllabus', syllabusRoutes);
app.use('/api/interview-questions', interviewQsRoutes);

// Get the MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

// Check if URI is undefined and give a useful error message
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in your environment variables.");
  process.exit(1); // Stop the server from starting
}

// Connect MongoDB and Start Server
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ MongoDB connected\n🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
