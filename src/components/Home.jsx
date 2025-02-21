import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const socialLinks = [
  {
    href: "https://github.com/Saurabh-shukla1",
    icon: Github,
    label: "Github"
  },
  {
    href: "www.linkedin.com/in/saurabh-shukla11",
    icon: Linkedin,
    label: "Linkedin"
  },
  {
    href: "https://www.instagram.com/saurabh_.shukla/",
    icon: Instagram,
    label: "Instagram"
  },
  {
    href: "mailto:SaurabhShukla6392@gmail.com",
    icon: Mail,
    label: "Mail"
  }
];

const HomeSection = ({ isDarkMode = false, isVisible = true, sectionRef = null }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!sectionRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowContent(true);
          } else {
            setShowContent(false);
          }
        });
      },
      { threshold: 0.3 }
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
    <section 
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center transition-opacity duration-1000 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 overflow-hidden flex items-center justify-center flex-wrap gap-x-3">
          <span 
            className={`inline-block transition-all duration-1000 transform ${
              showContent ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}
          >
            Hello, I'm
          </span>
          <span 
            className={`text-blue-600 inline-block transition-all duration-1000 transform ${
              showContent ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
          >
            Saurabh Shukla
          </span>
        </h1>
        <p className={`text-xl text-gray-600 dark:text-gray-300 mb-8 transition-all duration-1000 ${
          showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          Full Stack Developer | UI/UX Enthusiast | Problem Solver | Data Science Enthusiast
        </p>
        <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 ${
          showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          {socialLinks.map(({ href, icon: Icon, label }, index) => (
            <a
              key={label}
              href={href}
              className={`flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 px-4 py-2 rounded-lg transition-all duration-500 transform ${
                showContent 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection;