import express from 'express';
import { getAllCourses, getCourseById, addCourse } from '../controllers/course.js';

const router = express.Router();

// Route to get all courses
router.get('/getallcourses', getAllCourses);

// Route to get a course by ID
router.get('/getcoursebtid/:id', getCourseById);

// Route to add a new course
router.post('/addcourse', addCourse);

router.post('/addcourses', addCourse);

export default router;
