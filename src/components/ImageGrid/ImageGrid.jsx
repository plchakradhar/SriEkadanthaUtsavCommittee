import React from 'react';
import { motion } from 'framer-motion';
import './ImageGrid.css';

// Try to import images with fallbacks
let img1, img2, img3, img4, img5, img6, img7, img8, questionMark;

try {
  img1 = require('../../assets/images/festival1.jpg');
} catch {
  img1 = 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Festival+1';
}

try {
  img2 = require('../../assets/images/festival2.jpg');
} catch {
  img2 = 'https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Festival+2';
}

try {
  img3 = require('../../assets/images/festival3.jpg');
} catch {
  img3 = 'https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Festival+3';
}

try {
  img4 = require('../../assets/images/festival4.jpg');
} catch {
  img4 = 'https://via.placeholder.com/300x300/96CEB4/FFFFFF?text=Festival+4';
}

try {
  img5 = require('../../assets/images/festival5.jpg');
} catch {
  img5 = 'https://via.placeholder.com/300x300/FFEAA7/FFFFFF?text=Festival+5';
}

try {
  img6 = require('../../assets/images/festival6.jpg');
} catch {
  img6 = 'https://via.placeholder.com/300x300/DDA0DD/FFFFFF?text=Festival+6';
}

try {
  img7 = require('../../assets/images/festival7.jpg');
} catch {
  img7 = 'https://via.placeholder.com/300x300/FF8C42/FFFFFF?text=Festival+7';
}

try {
  img8 = require('../../assets/images/festival8.jpg');
} catch {
  img8 = 'https://via.placeholder.com/300x300/FFD93D/FFFFFF?text=Festival+8';
}

try {
  questionMark = require('../../assets/images/question-mark.png');
} catch {
  questionMark = 'https://via.placeholder.com/300x300/f5f5f5/FF6B2C?text=?';
}

const ImageGrid = () => {
  const images = [
    { src: img1, alt: 'Festival Celebration 1' },
    { src: img2, alt: 'Festival Celebration 2' },
    { src: img3, alt: 'Festival Celebration 3' },
    { src: img4, alt: 'Festival Celebration 4' },
    { src: img5, alt: 'Festival Celebration 5' },
    { src: img6, alt: 'Festival Celebration 6' },
    { src: img7, alt: 'Festival Celebration 7' },
    { src: img8, alt: 'Festival Celebration 8' },
    { src: questionMark, alt: 'Coming Soon', isQuestion: true },
  ];

  return (
    <div className="image-grid-container">
      <div className="image-grid">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`grid-item ${image.isQuestion ? 'question-mark' : ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              rotate: image.isQuestion ? 360 : index % 2 === 0 ? 2 : -2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={image.src} alt={image.alt} />
            {!image.isQuestion && (
              <motion.div
                className="image-overlay"
                initial={{ opacity: 0, y: 50 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span>{image.alt}</span>
              </motion.div>
            )}
            {image.isQuestion && (
              <motion.div
                className="image-overlay question-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span>📅 Coming Soon!</span>
                <p>Stay tuned for more</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;