import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import "./index.css";
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';
import { auth, db, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";


const NavBar11 = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [profileData, setProfileData] = useState([]);

  const [user] = useAuthState(auth);


  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const user_id = localStorage.getItem("id");
  
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/enroll/enrolledcourses', {
        params: {
          user_id: user_id
        }
      });
      if (response.status === 200) {
        setProfileData(response.data.enrolledCourses);
        console.log(response.data.enrolledCourses);
      } else {
        throw new Error('Failed to fetch profile data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload();
  };

  const handleCallButtonClick = () => {
    const phoneNumber = "8062181169";
    window.alert(`If Any Queries Feel Free to Contact: ${phoneNumber}`);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <nav>
      <Link to="/" className="title">
        <img className='main-logo' src="https://res.cloudinary.com/ajaymedidhi7/image/upload/v1706082314/MicrosoftTeams-image_1_tiacii.jpg" alt="Logo" />
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/courses">COURSES</NavLink>
        </li>
        <li className='nav-item' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <Link to="#">
            COMPANY {!isDropdownOpen && <FontAwesomeIcon icon={faCaretDown} />}
          </Link>
          <ul className={`dropdown ${isDropdownOpen ? 'active' : ''}`}>
            <li><Link to="/aboutus">About us</Link></li>
            <li><Link to="/team">Teams</Link></li>
            <li><Link to="/contactus">Contact Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </li>
        <li>
          <NavLink to="/blog">BLOG</NavLink>
        </li>
        
          {user? (
            <li className='nav-item' onMouseEnter={toggleProfileDropdown} onMouseLeave={toggleProfileDropdown}>
          <Link to="#">
            <div style={{ fontSize: "17px" }} className='user-icon' ><FontAwesomeIcon icon={faUser} /></div>
          </Link>
          <ul className={`profiledropdown ${isProfileDropdown ? 'active' : ''}`}>
            <h5 style={{textAlign:"center",color:"black",fontSize:"1rem"}}>Welcome {name}</h5>
                <h6 style={{color:"black",textDecoration:"underline"}}>Enrolled Courses:</h6>
                {profileData.map((course, index) => (
                  <li key={index} style={{color:"grey"}}>{course.course_name}</li>
                ))}
                <button>Settings</button>
                <button>Cart</button>
                <button onClick={handleLogout} onClick={logout}>Logout</button>
          </ul>
        </li>
            
          ) : (
            <li>
              <Link to="/signup" className='btn-login'>
              SignUp
            </Link>
            </li>
          )}
        <li>
          <button onClick={handleCallButtonClick}><FontAwesomeIcon icon={faPhone} className='call-icon' /></button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar11;
