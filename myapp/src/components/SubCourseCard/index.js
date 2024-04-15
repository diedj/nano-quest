import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import  axios from 'axios';
import { totalData } from '../Data/totalData';
import './index.css'; // Import the CSS file
import Navbar from '../Navbar11';
import {useNavigate} from 'react-router-dom';

const SubCoursePage = ({ addToCart }) => { // Changed from SubCourseCard to SubCoursePage
  // Access the URL parameter (sub-course id) using useParams hook
  const { id } = useParams();
  const [subCourseDetails, setSubCourseDetails] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate=useNavigate();
  // Fetch sub-course details based on the id
  useEffect(() => {
    // Find the sub-course details from the skillsList based on the id
    const foundSkill = totalData.find(skill => skill.id === parseInt(id));
    // Set the sub-course details
    setSubCourseDetails(foundSkill);
  }, [id]);

  const onEnroll = async (subCourse) => {
  const user = localStorage.getItem("name");
  const user_id = localStorage.getItem("id");
  const course_id = subCourse.id;
  const course_name=subCourse.title
  if (!user) {
    navigate('/login');
  } else {
    try {
      const res = await axios.post("http://localhost:5000/enroll/enroll", { user_id, course_id,course_name });
      
      if (res.data.success === true) {
        console.log(res)
        alert(res.data.message);
      }
      
      addToCart(subCourse);
      navigate('/cart');
    } catch (err) {
      console.log(err);
    }
  }
}


  // Render the sub-course details
  return (
    <div>
      <Navbar />
      {subCourseDetails && (
        <div>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', margin: '20px 0', color: '#ff7e5f' }}>
            Explore {subCourseDetails.title} Sub-Courses
          </h2>
          <div className="card-container">
            {subCourseDetails.subCourses.map(subCourse => (
              <div
                key={subCourse.id}
                className="card"
                onMouseEnter={() => setHoveredCard(subCourse.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3>{subCourse.title}</h3>
                  <button onClick={() => onEnroll(subCourse)}>Enroll</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SubCoursePage;
