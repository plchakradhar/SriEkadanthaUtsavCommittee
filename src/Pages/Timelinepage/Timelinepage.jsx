import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Timelinepage.css';

import img1 from '../../assets/images/festival1.jpg';
import img2 from '../../assets/images/festival2.jpg';
import img3 from '../../assets/images/festival3.jpg';
import img4 from '../../assets/images/festival4.jpg';
import img5 from '../../assets/images/festival5.jpg';
import img6 from '../../assets/images/festival6.jpg';
import img7 from '../../assets/images/festival7.jpg';
import img8 from '../../assets/images/festival8.jpg';

const TIMELINE_DATA = [
  { year: '2017', title: 'Beginning of Utsav', desc: 'The grand beginning of Sri Ekadantha Utsav.', image: img1 },
  { year: '2018', title: 'Growing Together', desc: 'More devotees joined the celebration, expanding our community.', image: img2 },
  { year: '2019', title: 'Grand Celebrations', desc: 'Introduced new cultural events and grander festivities.', image: img3 },
  { year: '2020', title: 'Virtual Devotion', desc: 'Adapted to the times by celebrating safely from our homes.', image: img4 },
  { year: '2021', title: 'Return of Joy', desc: 'Resumed physical gatherings with renewed enthusiasm.', image: img5 },
  { year: '2022', title: 'Expanding Horizons', desc: 'A special milestone year for the committee with new initiatives.', image: img6 },
  { year: '2023', title: 'Community Growth', desc: 'Introduced extensive auctions and new donor programs.', image: img7 },
  { year: '2024', title: 'The Biggest Celebration', desc: 'Our most magnificent and widely attended utsav to date.', image: img8 },
  { year: '2025', title: 'Future Vision', desc: 'Looking forward to even greater upcoming celebrations.', image: img1 },
];

const Timelinepage = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (e, idx) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === idx ? null : idx);
  };

  const navigateTo = (path) => {
    setActiveMenu(null);
    navigate(path);
  };

  return (
    <div className="timeline-page">
      <div className="timeline-header">
        <h1 className="timeline-title">Our Journey</h1>
        <p className="timeline-subtitle">The divine path of Sri Ekadantha Utsav from 2017 to 2025</p>
      </div>

      <div className="timeline-container">
        {/* The center golden line */}
        <div className="timeline-center-line"></div>

        {TIMELINE_DATA.map((item, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <motion.div 
              key={idx} 
              className={`timeline-item ${isLeft ? 'left-item' : 'right-item'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              
              {/* Date text (opposite side of the card) */}
              <div className="timeline-date">
                <span>{item.year}</span>
              </div>

              {/* The dot on the center line */}
              <div className="timeline-dot"></div>

              {/* The connecting line from dot to card */}
              <div className="timeline-connector"></div>

              {/* The content card */}
              <div className="timeline-card">
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                
                {/* The interactive image container */}
                <div 
                  className="card-image-wrapper" 
                  onClick={(e) => handleMenuClick(e, idx)}
                  ref={activeMenu === idx ? menuRef : null}
                >
                  <img src={item.image} alt={item.year} className="card-image" />
                  
                  {/* Floating Action Menu */}
                  <AnimatePresence>
                    {activeMenu === idx && (
                      <motion.div 
                        className={`action-menu ${isLeft ? 'menu-left' : 'menu-right'}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button onClick={(e) => { e.stopPropagation(); navigateTo('/gallery'); }}>Gallery</button>
                        <button onClick={(e) => { e.stopPropagation(); navigateTo('/donar'); }}>Donors</button>
                        <button onClick={(e) => { e.stopPropagation(); navigateTo('/auction'); }}>Auctions</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timelinepage;
