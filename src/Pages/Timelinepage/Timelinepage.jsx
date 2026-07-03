import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Timelinepage.css';

import img1 from '../../assets/images/2018-vigraham.jpeg';
import img2 from '../../assets/images/2018-vigraham.jpeg';
import img3 from '../../assets/images/2019-vigraham.jpeg';
import img4 from '../../assets/images/2021-vigraham.jpg';
import img5 from '../../assets/images/2022-vigraham.jpg';
import img6 from '../../assets/images/2023-vigraham.jpeg';
import img7 from '../../assets/images/2024-vigraham.jpg';
import img8 from '../../assets/images/2025-vigraham.jpg';
import img9 from '../../assets/images/2025-vigraham.jpg';


const TIMELINE_DATA = [
  { year: '2017', title: 'Beginning of Utsav', desc: 'The grand beginning of Sri Ekadantha Utsav.', image: img1 },
  { year: '2018', title: 'Growing Together', desc: 'More devotees joined the celebration, expanding our community.', image: img2 },
  { year: '2019', title: 'Grand Celebrations', desc: 'Introduced new cultural events and grander festivities.', image: img3 },
  // { year: '2020', title: 'Virtual Devotion', desc: 'Adapted to the times by celebrating safely from our homes.', image: img4 },
  { year: '2021', title: 'Return of Joy', desc: 'Resumed physical gatherings with renewed enthusiasm.', image: img4 },
  { year: '2022', title: 'Expanding Horizons', desc: 'A special milestone year for the committee with new initiatives.', image: img5 },
  { year: '2023', title: 'Community Growth', desc: 'Introduced extensive auctions and new donor programs.', image: img6 },
  { year: '2024', title: 'The Biggest Celebration', desc: 'Our most magnificent and widely attended utsav to date.', image: img7 },
  { year: '2025', title: 'Future Vision', desc: 'Looking forward to even greater upcoming celebrations.', image: img8 },
  { year: '2026', title: 'Upcoming...', desc: 'Stay tuned for what is coming next.', image: '?' },
];

const Timelinepage = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const containerRef = useRef(null);

  // Scroll animation for the path
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const isMobile = windowWidth <= 768;
  const containerWidth = Math.min(windowWidth, 1000); // 1000 is max-width of container
  const centerX = containerWidth / 2;
  const amplitude = isMobile ? 80 : 250;
  const ySpacing = isMobile ? 200 : 250;
  const topPadding = 100;
  const totalHeight = (TIMELINE_DATA.length - 1) * ySpacing + topPadding + 400; // Extra space at bottom for popup

  const getX = (i) => centerX + Math.sin((i * Math.PI) / 2) * amplitude;
  const getY = (i) => i * ySpacing + topPadding;

  const generatePath = () => {
    if (TIMELINE_DATA.length === 0) return '';
    let path = '';
    for (let i = 0; i < TIMELINE_DATA.length; i++) {
      const x = getX(i);
      const y = getY(i);
      if (i === 0) {
        path += `M ${x} ${y} `;
      } else {
        const prevX = getX(i - 1);
        const prevY = getY(i - 1);
        const cp1y = prevY + (y - prevY) / 2;
        const cp2y = prevY + (y - prevY) / 2;
        path += `C ${prevX} ${cp1y}, ${x} ${cp2y}, ${x} ${y} `; // Curved connections
      }
    }
    return path;
  };

  const pathData = generatePath();

  return (
    <div className="timeline-page">
      <div className="timeline-header">
        <h1 className="timeline-title">Our Journey</h1>
        <p className="timeline-subtitle">The divine path of Sri Ekadantha Utsav from 2017 to 2026</p>
      </div>

      <div className="timeline-container" style={{ height: `${totalHeight}px` }} ref={containerRef}>
        
        {/* SVG Path Background - Thin curved dashed line with scroll animation mask */}
        <svg className="timeline-path-svg">
          <mask id="lineMask">
            <motion.path
              d={pathData}
              stroke="white"
              strokeWidth="20"
              fill="none"
              style={{ pathLength }}
            />
          </mask>
          
          <path 
            d={pathData} 
            stroke="#FFDA62" 
            strokeWidth={isMobile ? "4" : "6"} 
            strokeDasharray="12 12" 
            fill="none" 
            strokeLinecap="round"
            mask="url(#lineMask)"
          />
        </svg>

        {TIMELINE_DATA.map((item, i) => {
          const x = getX(i);
          const y = getY(i);

          return (
            <div 
              key={i} 
              className="timeline-node-wrapper"
              style={{
                top: `${y}px`,
                left: `${x}px`, // Using exact pixels based on container width now
                zIndex: activeMenu === i ? 20 : 10
              }}
              ref={activeMenu === i ? menuRef : null}
            >
              
              <motion.div 
                className={`node-circle ${activeMenu === i ? 'active' : ''}`}
                onClick={(e) => handleMenuClick(e, i)}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {item.image === '?' ? (
                  <div className="question-mark">?</div>
                ) : (
                  <img src={item.image} alt={item.year} />
                )}
              </motion.div>
              
              <motion.div 
                className="node-year"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
              >
                {item.year}
              </motion.div>

              <AnimatePresence>
                {activeMenu === i && (
                  <motion.div 
                    className="node-popup"
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <div className="popup-actions">
                      <button onClick={(e) => { e.stopPropagation(); navigateTo('/gallery'); }}>Gallery</button>
                      <button onClick={(e) => { e.stopPropagation(); navigateTo('/donar'); }}>Donors</button>
                      <button onClick={(e) => { e.stopPropagation(); navigateTo('/auction'); }}>Auctions</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timelinepage;
