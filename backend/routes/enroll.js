// enroll.js
import express from 'express';
import { enrollCourse, getEnrolledCourses, clearCart, removeCourse } from '../controllers/enroll.js';

const router = express.Router();

router.post('/enroll', enrollCourse);
router.get('/enrolledcourses', getEnrolledCourses); // Use query parameters
router.delete('/clearcart', clearCart); // Use query parameters
router.delete('/removecourse', removeCourse); // Use query parameters

export default router;
