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
const profileRoutes = require('./routes/profileRoutes')
const syllabusRoutes = require('./routes/syllabusRoutes');



// Use Routes
app.use('/api/courses', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/coursedetails', courseDetailsRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/quizscore', quizScoreRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/syllabus', syllabusRoutes);





// Connect MongoDB and Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.log(err));