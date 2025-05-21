import React, { useState, useEffect } from 'react';
import './profile.css';

const AnimatedProfileImage = ({ sectionRef = null, isDarkMode }) => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    // Initial load animation
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 300); // Slight delay after page load

    return () => clearTimeout(timer);
  }, []);

  // Scroll animation
  useEffect(() => {
    if (!sectionRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowImage(true);
          } else {
            setShowImage(false);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the image is visible
    );

    if (sectionRef?.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef?.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionRef]);

  return (
    <div ref={sectionRef} className="overflow-hidden relative p-3 rounded-lg">
      {/* Animated border container */}
      <div className="absolute inset-0 rounded-lg">
        {/* Outer rotating gradient */}
        <div className="absolute inset-0 rounded-lg border-[6px] border-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-border-rotate opacity-100" />
        
        {/* Inner rotating gradient for extra glow */}
        <div className="absolute inset-[3px] rounded-lg border-[4px] border-transparent bg-gradient-to-l from-blue-400 via-purple-400 to-pink-400 animate-border-rotate-reverse opacity-70" />
        
        {/* Background fill */}
        <div className={`absolute inset-[6px] rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`} />
      </div>

      {/* Image container with glow effect */}
      <div className="relative rounded-lg overflow-hidden">
        <img
          src="/image.png"
          alt="Profile"
          className={`w-full transition-all duration-1000 transform
            ${showImage 
              ? 'opacity-100 translate-y-0 translate-x-0 scale-100' 
              : 'opacity-0 translate-y-10 translate-x-10 scale-95'
            }
          `}
        />
        {/* Overlay glow effect */}
        <div className={`absolute inset-0 ${isDarkMode ? 'glow-effect-dark' : 'glow-effect-light'}`} />
      </div>
    </div>
  );
};

export default AnimatedProfileImage;