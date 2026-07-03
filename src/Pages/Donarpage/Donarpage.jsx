import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './Donarpage.css';

// Placeholder generic images for the gallery
const placeHolderImages = [
  'https://images.unsplash.com/photo-1596431940984-7a134a6bc664?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512413914488-842240b8a3e7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1592652416049-9d511394c8b8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1582292317584-699745da7992?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1598555198471-f9260c1dcbdf?auto=format&fit=crop&w=600&q=80'
];

// Data Structure linking Years to their Items and Galleries
const generateYearData = (year) => ({
  year: year.toString(),
  categories: [
    { id: 'vinayaka', name: 'Vinayaka Vigraham', icon: '🛕', images: placeHolderImages },
    { id: 'tractor', name: 'Tractor Donation', icon: '🚜', images: placeHolderImages },
    { id: 'coin', name: 'Silver Coin', icon: '🪙', images: placeHolderImages },
    { id: 'laddu', name: 'Laddu Donation', icon: '🍮', images: placeHolderImages },
    { id: 'rice', name: 'Rice Donation', icon: '🌾', images: placeHolderImages }
  ]
});

const DONOR_DATA = [
  generateYearData(2017),
  generateYearData(2018),
  generateYearData(2019),
  generateYearData(2020),
  generateYearData(2021),
  generateYearData(2022),
  generateYearData(2023),
  generateYearData(2024),
  generateYearData(2025)
];

const Donarpage = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const location = useLocation();
  const selectedYear = location.state?.year || null;

  const filteredData = selectedYear 
    ? DONOR_DATA.filter(data => data.year === selectedYear.toString())
    : DONOR_DATA;

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedDonation) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedDonation]);

  const openModal = (year, category) => {
    setSelectedDonation({ year, ...category });
  };

  const closeModal = () => {
    setSelectedDonation(null);
  };

  return (
    <div className="donar-page">
      {/* Animated Temple Background Elements */}
      <div className="temple-particles-container">
        {[...Array(15)].map((_, i) => (
          <div key={`petal-${i}`} className={`petal petal-${i + 1}`}></div>
        ))}
        {[...Array(15)].map((_, i) => (
          <div key={`diya-${i}`} className={`diya-glow diya-${i + 1}`}></div>
        ))}
      </div>

      <div className="donar-content">
        <motion.div 
          className="donar-hero"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="ganesha-icon"></div>
          <h1>🙏 Our Generous Donors 🙏</h1>
          <div className="decorative-divider">
            <span>✧</span><hr/><span>✧</span><hr/><span>✧</span>
          </div>
          <p>Celebrating the generous hearts who have supported our Ganesh Chaturthi celebrations through the years.</p>
        </motion.div>

        <div className="donar-timeline-container">
          {/* Vertical decorative timeline line */}
          <div className="donar-vertical-line"></div>

          {filteredData.map((data, index) => (
            <div key={data.year} className="donar-year-block">
              
              {/* Year Badge */}
              <motion.div 
                className="temple-year-badge"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, type: 'spring' }}
              >
                {data.year}
              </motion.div>
              
              {/* Timeline Connector */}
              {index < filteredData.length - 1 && (
                <div className="donar-connector">▼</div>
              )}

              {/* Donation Categories Row */}
              <div className="donation-categories-row">
                {data.categories.map((category, i) => (
                  <motion.div 
                    key={category.id}
                    className="donation-card"
                    onClick={() => openModal(data.year, category)}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ scale: 1.08, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="donation-icon-wrapper">
                      <span className="donation-icon">{category.icon}</span>
                    </div>
                    <div className="donation-name">{category.name}</div>
                  </motion.div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Popup Modal */}
      <AnimatePresence>
        {selectedDonation && (
          <motion.div 
            className="donar-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="donar-modal-content"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside
            >
              <button className="donar-close-btn" onClick={closeModal}>&times;</button>
              
              <div className="donar-modal-header">
                <h2>{selectedDonation.year}</h2>
                <h3>{selectedDonation.name}</h3>
              </div>
              
              <div className="donar-modal-gallery">
                {selectedDonation.images.map((imgSrc, idx) => (
                  <div key={idx} className="donar-gallery-image">
                    <img src={imgSrc} alt={`${selectedDonation.name} ${idx + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Donarpage;
