import React, { useState, useEffect } from 'react';

const AnimatedProfileImage = ({ sectionRef = null }) => {
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
    <div ref={sectionRef} className="overflow-hidden">
      <img
        src="/Profile.png"
        alt="Profile"
        className={`rounded-lg shadow-lg w-full transition-all duration-1000 transform
          ${showImage 
            ? 'opacity-100 translate-y-0 translate-x-0 scale-100' 
            : 'opacity-0 translate-y-10 translate-x-10 scale-95'
          }
        `}
      />
    </div>
  );
};

export default AnimatedProfileImage;