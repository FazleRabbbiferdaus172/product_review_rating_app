import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';


const AutoSlider = ({ 
  slides, 
  interval = 4000,
  startDelay = 0 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  //slides = [{comment: "hi"}, {comment: "hello"}, {comment: "ola"}]
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">

      {/* Indicators */}
      <div >
        <h4>{slides[currentIndex].comment}</h4> 
        {/* {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`button is-small ${currentIndex === index ? 'is-primary' : 'is-white'}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="icon is-small">
            <i className={`fas ${currentIndex === index ? 'fa-circle' : 'fa-circle-o'}`} />
            </span>
          </button>
        
        ))} */}
 
      </div>
    </div>
  );
};

export default AutoSlider;