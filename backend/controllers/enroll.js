// controllers/enroll.js
import Enrollment from '../models/enroll.js';

export const enrollCourse = async (req, res) => {
    const { user_id, course_id, course_name,course_price } = req.body;

    try {
        await Enrollment.create({ user_id, course_id, course_name,course_price });
        return res.status(201).json({ success: true, message: "Course added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Failed to add course" });
    }
};

export const getEnrolledCourses = async (req, res) => {
    const { user_id } = req.query; 
    try {
        const enrolledCourses = await Enrollment.find({ user_id });
        return res.status(200).json({ success: true, enrolledCourses });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Failed to fetch enrolled courses" });
    }
};

export const clearCart = async (req, res) => {
    const { user_id } = req.query; // Retrieve user_id from query parameters
    try {
        await Enrollment.deleteMany({ user_id });
        return res.status(200).json({ success: true, message: "Cart cleared successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Failed to clear cart" });
    }
};

export const removeCourse = async (req, res) => {
    const { user_id, course_id } = req.query; // Retrieve user_id and course_id from query parameters
    try {
        await Enrollment.deleteOne({ user_id, course_id });
        return res.status(200).json({ success: true, message: "Course removed successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Failed to remove course" });
    }
};
