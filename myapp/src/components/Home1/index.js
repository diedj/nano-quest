import React, { useState, useEffect } from 'react';
import Navbar11 from '../Navbar11'; 
import Footer from '../Footer';
import desktopImg from '../../assets/desktop-landing-image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import serviceImg1 from '../../assets/service-img-1.avif';
import serviceImg2 from '../../assets/service-img-2.avif';
import serviceImg3 from '../../assets/service-img-3.avif';
import wcu1 from '../../assets/wcu-1.avif';
import wcu2 from '../../assets/wcu-2.avif';
import { motion } from 'framer-motion';
import Slider from '../Slider';

import './index.css';
import { Link } from 'react-router-dom';
import { fadeIn } from '../../variants';
import ReactPlayer from 'react-player';

const Home = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showVideo, setShowVideo] = useState(true); // Default to true, so the video shows when the user first opens the website

  useEffect(() => {
    // Check local storage if the video has been played before
    const videoPlayedBefore = localStorage.getItem('videoPlayed');
    if (videoPlayedBefore) {
      setShowVideo(false); // If the video has been played before, don't show it again
    }
  }, []);

  // Function to handle when the video has finished loading
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  // Function to handle when the video has ended
  const handleVideoEnd = () => {
    setVideoEnded(true);
    localStorage.setItem('videoPlayed', 'true'); // Store in local storage that the video has been played
  };
  const slides = [
  {
    quote: "This is the best no-code platform I've ever seen",
    name: 'Alyssa Morris',
    position: 'Product Manager, Intel',
    image: 'https://source.unsplash.com/IF9TK5Uy-KI'
  },
  {
    quote: 'The perfect organizer and team builder',
    name: 'Randall Howard',
    position: 'UX Designer, Netflix',
    image: 'https://source.unsplash.com/C5XyLljkMrY'
  },
  {
    quote: 'Flexible product with near endless possibilities',
    name: 'Adam Worrell',
    position: 'Data Analyst, Spotify',
    image: 'https://source.unsplash.com/e12wQLAjQi0'
  }
];

  return (
    <>
      <Navbar11 />
      {showVideo && !videoEnded && (
  <div className="video-container">
    <ReactPlayer
      url="https://youtube.com/shorts/UwZxa08abn4?feature=share"
      controls
      onReady={handleVideoLoad}
      onEnded={handleVideoEnd}
      style={{ marginTop: '2rem' }}
    />
    <div className="close-button" onClick={() => setShowVideo(false)}>
     <FontAwesomeIcon icon={faTimes} style={{ fontSize: '24px',background: 'transparent',color:"white" }} />
    </div>
  </div>
)}

        {(!showVideo || videoEnded) && (
        <div className="home-container">
          <motion.div
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="home-content"
          >
            <h1 className="home-heading">Welcome To Nanoquest</h1>
            <p className="home-description">
              Explore our wide range of skill courses to enhance your knowledge and expertise. Learn at your own pace with our elearning platform.
            </p>
            <Link to='/signup'>
              <button className="glow-on-hover" type="button">UPGRADE YOUR SKILLS</button>
            </Link>
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className='desktop-img-container'
          >
            <img
              src={desktopImg}
              alt="dresses to be noticed"
              className="home-desktop-img"
            />
          </motion.div>
        </div>
      )}

      {(!showVideo || videoEnded) && (
        <div className='services-container'>
          <div className='service-cards-container'>
            <motion.div
              variants={fadeIn("left", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className='service-card'>
              <div className='service-card-content'>
                <h4>Skill Courses</h4>
                <p>Choose from a wide range of skill courses designed to help you develop and master new skills.</p>
              </div>
              <div className='service-card-image'>
                <img src={serviceImg1} alt="service-img" className='service-img'/>
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className='service-card'>
              <div className='service-card-content'>
                <h4>Real-time Feedback</h4>
                <p>Get instant feedback and personalized recommendations to improve your learning.</p>
              </div>
              <div className='service-card-image'>
                <img src={serviceImg2} alt="service-img" className='service-img'/>
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn("left", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className='service-card'>
              <div className='service-card-image'>
                <img src={serviceImg1} alt="service-img" className='service-img'/>
              </div>
              <div className='service-card-content'>
                <h4>Interactive Quizzes</h4>
                <p>Test your knowledge and track your progress with our interactive quizzes.</p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className='service-card'>
              <div className='service-card-image'>
                <img src={serviceImg3} alt="service-img" className='service-img'/>
              </div>
              <div className='service-card-content'>
                <h4>Community Support</h4>
                <p>Connect with a community of learners and experts to share ideas and get support.</p>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {(!showVideo || videoEnded) && (
        <>
        <h4 className='testimonials-heading'>Testimonials</h4>
        <div className='testimonials-container'>
          
           <Slider slides={slides} />
        </div>
        </>
      )}

      {(!showVideo || videoEnded) && (
        <div className='why-choose-container'>
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className='why-choose-card'>
            <img src={wcu1} alt="wcu"/>
            <h3>Why Choose NanoQuest for Skillbased elearning</h3>
            <p>Discover the power of skillbased interactive elearning with NanoQuest. Enhance your knowledge and expertise in a fun and engaging way. Join our platform today!</p>
            
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className='why-choose-card'>
            <img src={wcu2} alt="wcu"/>
            <h3>How NanoQuest Revolutionizes elearning</h3>
            <p>Experience a new era of elearning with NanoQuest. Our skillbased interactive platform offers a unique and effective way to learn. Discover the features that make NanoQuest the leading choice for online education.</p>
            
          </motion.div>
        </div>
      )}
      <Footer/>
    </>
  );
};

export default Home;
