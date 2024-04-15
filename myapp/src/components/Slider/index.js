import React, { useState, useEffect } from 'react';
import './index.css';

const Slider = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(slides.length / 2)); // Set initial activeIndex to middle slide index

  useEffect(() => {
    // Add animation class to the middle slide when the component mounts
    const middleSlide = document.querySelector(`.item:nth-child(${activeIndex + 1})`);
    middleSlide.classList.add('animation');
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleButtonClick = (index) => {
    setActiveIndex(index);
    const items = document.querySelectorAll('.item');
    items.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add('animation');
      } else {
        item.classList.remove('animation');
      }
    });
  };

  return (
    <main>
      <ul className='slider' style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <li key={index} className='item'>
            <div className='testimonial'>
              <p>"{slide.quote}"</p>
              <p>{slide.name}</p>
              <p>{slide.position}</p>
            </div>
            <img className='image' src={slide.image} alt={slide.name} />
          </li>
        ))}
      </ul>
      <nav>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`btn ${activeIndex === index ? 'expand' : ''}`}
            onClick={() => handleButtonClick(index)}
            data-index={index}
          ></button>
        ))}
      </nav>
    </main>
  );
};

export default Slider;
