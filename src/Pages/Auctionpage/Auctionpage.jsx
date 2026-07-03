import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Auctionpage.css';

// Placeholder generic images for the gallery
const placeHolderImages = [
  'https://images.unsplash.com/photo-1517409278911-37d3fa2fa998?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1542602787-8fb777c570f8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1605051939521-7fa1ef53fc74?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1601072935293-f11bc0195655?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1596541595083-d52fecbc5304?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1582046830571-0f7236a28ccf?auto=format&fit=crop&w=600&q=80'
];

// Data Structure linking Years to their Items and Galleries
const generateYearData = (year) => ({
  year: year.toString(),
  items: [
    { id: 'laddu', name: 'Laddu', icon: '🧆', images: placeHolderImages },
    { id: 'coin', name: 'Silver Coin', icon: '🪙', images: placeHolderImages },
    { id: 'garland', name: 'Money Garland', icon: '📿', images: placeHolderImages }
  ]
});

const AUCTION_DATA = [
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

const Auctionpage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedItem]);

  const openModal = (year, item) => {
    setSelectedItem({ year, ...item });
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="auction-page">
      {/* Animated Background Elements */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      <div className="auction-content">
        <motion.div 
          className="auction-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Auction History</h1>
          <p>The legacy of divine offerings</p>
        </motion.div>

        <div className="auction-timeline-container">
          {/* Vertical decorative timeline line */}
          <div className="vertical-line"></div>

          {AUCTION_DATA.map((data, index) => (
            <div key={data.year} className="timeline-year-block">
              
              {/* Year Badge */}
              <motion.div 
                className="year-badge-wrapper"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, type: 'spring' }}
              >
                <div className="year-badge">
                  {data.year}
                </div>
              </motion.div>
              
              {/* Down Arrow / Timeline Connector */}
              {index < AUCTION_DATA.length && (
                <div className="down-connector">⬇</div>
              )}

              {/* Auction Items Row */}
              <div className="auction-items-row">
                {data.items.map((item, i) => (
                  <motion.div 
                    key={item.id}
                    className="auction-item-card"
                    onClick={() => openModal(data.year, item)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="item-icon-wrapper">
                      <span className="item-icon">{item.icon}</span>
                    </div>
                    <div className="item-name">{item.name}</div>
                  </motion.div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Popup Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            className="auction-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="auction-modal-content"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside
            >
              <button className="close-modal-btn" onClick={closeModal}>&times;</button>
              
              <div className="modal-header">
                <h2>{selectedItem.year}</h2>
                <h3>{selectedItem.name} Auction</h3>
              </div>
              
              <div className="modal-gallery">
                {selectedItem.images.map((imgSrc, idx) => (
                  <div key={idx} className="gallery-image-wrapper">
                    <img src={imgSrc} alt={`${selectedItem.name} ${idx + 1}`} loading="lazy" />
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

export default Auctionpage;
