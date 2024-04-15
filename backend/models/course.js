import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  id: Number,
  name: String,
  courses: [{
    id: Number,
    Course: String,
    Price: String,
  }],
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
