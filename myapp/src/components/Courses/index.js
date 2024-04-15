import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar11';
import { totalData } from '../Data/totalData';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Courses = () => {
  const initialCategory = totalData.find(category => category.name === "Language and Literacy");
  const initialFreeCourses = initialCategory ? initialCategory.courses.filter(course => course.Price === "Free") : [];
  const initialPremiumCourses = initialCategory ? initialCategory.courses.filter(course => course.Price !== "Free") : [];

  const [currentCategory, setCurrentCategory] = useState(initialCategory);
  const [currentCourses, setCurrentCourses] = useState(initialFreeCourses);
  const [filterType, setFilterType] = useState("Free");

  const handleFilterChange = (filter) => {
    setFilterType(filter);
  };

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  const addToCart = async (course_id, course_name, course_price) => {
    const user_id = localStorage.getItem("id");
    try {
      const response = await axios.post('http://localhost:5000/enroll/enroll', { user_id, course_id, course_name, course_price });
      if (response.data.success === true) {
        console.log("Added successfully");
      } else {
        console.log("Error: Not added");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (currentCategory) {
      if (filterType === "Free") {
        setCurrentCourses(currentCategory.courses.filter(course => course.Price === "Free"));
      } else if (filterType === "Premium") {
        setCurrentCourses(currentCategory.courses.filter(course => course.Price !== "Free"));
      } else {
        setCurrentCourses(currentCategory.courses);
      }
    }
  }, [currentCategory, filterType]);

  return (
    <>
      <NavBar />
      <div className='courses-container'>
        <div className='left-bar'>
          <div className='category-buttons-container'>
            <button onClick={() => handleFilterChange("All")}>All</button>
            <button onClick={() => handleFilterChange("Free")}>Free</button>
            <button onClick={() => handleFilterChange("Premium")}>Premium</button>
          </div>
          {totalData.map((category) => (
            <div
              key={category.id}
              className={currentCategory && currentCategory.name === category.name ? 'category-left-card active' : 'category-left-card'}
              onClick={() => handleCategoryClick(category)}
            >
              <p className='category-button'>{category.name}</p>
              <FontAwesomeIcon icon={faChevronRight} className='left-bar-icon' />
            </div>
          ))}
        </div>
        <div className='right-bar'>
          <div className='right-bar-header-container'>
           <h3>{currentCategory && currentCategory.name}</h3>
          </div>
          <div className='right-bar-container'>
            {currentCourses.map(course => (
              <div key={course.id} className='course-cards-right-bar'>
                <p>{course.Course}</p>
                <div className='course-card-content'>
                  <p>{course.Price !== 'Free' && <FontAwesomeIcon icon={faRupeeSign} />} {course.Price}</p>
                  <Link to='/enroll'>
                    <button onClick={() => addToCart(course.id, course.Course, course.Price)}>Enroll</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Courses;
