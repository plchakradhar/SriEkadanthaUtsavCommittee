import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './Gallerypage.css';

// Placeholder Images
const phImg1 = 'https://images.unsplash.com/photo-1596431940984-7a134a6bc664?auto=format&fit=crop&w=600&q=80';
const phImg2 = 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=600&q=80';
const phImg3 = 'https://images.unsplash.com/photo-1512413914488-842240b8a3e7?auto=format&fit=crop&w=600&q=80';
const phImg4 = 'https://images.unsplash.com/photo-1592652416049-9d511394c8b8?auto=format&fit=crop&w=800&q=80'; // Taller image for masonry
const phImg5 = 'https://images.unsplash.com/photo-1582292317584-699745da7992?auto=format&fit=crop&w=600&q=80';

// Placeholder Video (Sample public mp4)
const phVideo1 = 'https://www.w3schools.com/html/mov_bbb.mp4';

// Dynamically load all assets for all years (folders starting with 20)
const imageModules = import.meta.glob('../../assets/20*/**/*.{jpeg,jpg,png,webp}', { eager: true, query: '?url', import: 'default' });
const videoModules = import.meta.glob('../../assets/20*/**/*.mp4', { eager: true, query: '?url', import: 'default' });

const dynamicItems = [];
let idCounter = 100;

Object.entries(imageModules).forEach(([path, url]) => {
  // Extract year and optional subfolder from path (e.g., ../../assets/2025/laddu/img.jpg)
  const match = path.match(/\/assets\/(20\d{2})\/(?:(.*?)\/)?([^/]+)$/);
  if (match) {
    const year = match[1];
    let subfolder = match[2] || 'All';
    const folderName = subfolder.charAt(0).toUpperCase() + subfolder.slice(1);
    
    dynamicItems.push({
      id: idCounter++,
      type: 'photo',
      year: year,
      title: `${year} ${folderName}`,
      description: `A beautiful moment from the ${folderName} collection.`,
      url: url
    });
  }
});

Object.entries(videoModules).forEach(([path, url]) => {
  const match = path.match(/\/assets\/(20\d{2})\/(?:(.*?)\/)?([^/]+)$/);
  if (match) {
    const year = match[1];
    let subfolder = match[2] || 'All';
    const folderName = subfolder.charAt(0).toUpperCase() + subfolder.slice(1);
    
    dynamicItems.push({
      id: idCounter++,
      type: 'video',
      year: year,
      title: `${year} ${folderName} Video`,
      description: `Highlights from the ${folderName} collection.`,
      url: url,
      thumbnail: phImg2 // Placeholder thumbnail for videos
    });
  }
});

// All gallery data is now dynamically loaded from the assets folders
const GALLERY_DATA = [
  ...dynamicItems
];

const Gallerypage = () => {
  const [filter, setFilter] = useState('all');
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);
  const location = useLocation();
  const selectedYear = location.state?.year || null;

  // We need a flat array of filtered data to allow Next/Prev navigation across years
  const flatFilteredData = useMemo(() => {
    return GALLERY_DATA.filter(item => {
      if (selectedYear && item.year !== selectedYear.toString()) return false;
      if (filter === 'all') return true;
      return item.type === filter;
    }).sort((a, b) => parseInt(b.year) - parseInt(a.year)); // Sort descending by year
  }, [filter, selectedYear]);

  // Group the flat filtered data by year for display
  const groupedData = useMemo(() => {
    const groups = {};
    flatFilteredData.forEach(item => {
      if (!groups[item.year]) {
        groups[item.year] = [];
      }
      groups[item.year].push(item);
    });
    // Return array of objects { year: '2025', items: [...] } sorted by year descending
    return Object.keys(groups)
      .sort((a, b) => b - a)
      .map(year => ({
        year,
        items: groups[year]
      }));
  }, [flatFilteredData]);

  // Handle body scroll locking when modal is open
  useEffect(() => {
    if (selectedMediaIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedMediaIndex]);

  // Keyboard navigation for modal
  const handleKeyDown = useCallback((e) => {
    if (selectedMediaIndex === null) return;
    
    if (e.key === 'Escape') {
      setSelectedMediaIndex(null);
    } else if (e.key === 'ArrowRight') {
      setSelectedMediaIndex((prev) => (prev + 1) % flatFilteredData.length);
    } else if (e.key === 'ArrowLeft') {
      setSelectedMediaIndex((prev) => (prev - 1 + flatFilteredData.length) % flatFilteredData.length);
    }
  }, [selectedMediaIndex, flatFilteredData.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openModal = (item) => {
    const index = flatFilteredData.findIndex(filteredItem => filteredItem.id === item.id);
    if (index !== -1) {
      setSelectedMediaIndex(index);
    }
  };

  const closeModal = () => {
    setSelectedMediaIndex(null);
  };

  const nextMedia = (e) => {
    e.stopPropagation();
    setSelectedMediaIndex((prev) => (prev + 1) % flatFilteredData.length);
  };

  const prevMedia = (e) => {
    e.stopPropagation();
    setSelectedMediaIndex((prev) => (prev - 1 + flatFilteredData.length) % flatFilteredData.length);
  };

  const selectedMedia = selectedMediaIndex !== null ? flatFilteredData[selectedMediaIndex] : null;

  return (
    <div className="gallery-page">
      {/* Animated Background Elements */}
      <div className="gallery-background">
        {[...Array(12)].map((_, i) => (
          <div key={`particle-${i}`} className={`gallery-particle particle-${i + 1}`}></div>
        ))}
        <div className="light-rays"></div>
      </div>

      <div className="gallery-content">
        {/* Hero Section */}
        <motion.div 
          className="gallery-hero"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="ganesha-silhouette"></div>
          <h1>Sri Ekadantha Utsav Memories</h1>
          <div className="gallery-divider">
            <span>✿</span><hr/><span>✿</span><hr/><span>✿</span>
          </div>
          {/* <p>Relive the unforgettable moments from every year of our celebrations.</p> */}
        </motion.div>

        {/* Filter Bar */}
        {/* <div className="gallery-filter-bar">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            📷 All
          </button>
          <button 
            className={`filter-btn ${filter === 'photo' ? 'active' : ''}`}
            onClick={() => setFilter('photo')}
          >
            🖼️ Photos
          </button>
          <button 
            className={`filter-btn ${filter === 'video' ? 'active' : ''}`}
            onClick={() => setFilter('video')}
          >
            🎥 Videos
          </button>
        </div> */}

        {/* Grouped Masonry Grids by Year */}
        <div className="gallery-years-container">
          <AnimatePresence>
            {groupedData.map((group) => (
              <motion.div 
                key={group.year} 
                className="gallery-year-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="year-section-header">
                  <hr className="year-line" />
                  <h2>{group.year}</h2>
                  <hr className="year-line" />
                </div>
                
                <motion.div className="horizontal-scroll-container" layout>
                  <AnimatePresence>
                    {group.items.map((item) => (
                      <motion.div 
                        key={item.id}
                        className="horizontal-item"
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => openModal(item)}
                      >
                        <div className="gallery-card">
                          <div className="gallery-thumbnail">
                            {item.type === 'video' ? (
                              <video 
                                src={item.url} 
                                className="gallery-video-preview"
                                muted 
                                loop 
                                playsInline
                                autoPlay
                              />
                            ) : (
                              <img 
                                src={item.url} 
                                alt={item.title} 
                                loading="lazy"
                              />
                            )}
                            <div className="gallery-card-overlay">
                              <button className="view-btn">View {item.type === 'video' ? 'Video' : 'Photo'}</button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
            
            {groupedData.length === 0 && (
              <motion.div 
                className="no-results-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p>No media found for the selected filter.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Fullscreen Media Viewer Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            className="media-viewer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <button className="viewer-close-btn" onClick={closeModal}>&times;</button>
            <button className="viewer-nav-btn prev" onClick={prevMedia}>&#10094;</button>
            <button className="viewer-nav-btn next" onClick={nextMedia}>&#10095;</button>
            
            <motion.div 
              className="media-viewer-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent close on content click
            >
              <div className="media-container">
                {selectedMedia.type === 'video' ? (
                  <video src={selectedMedia.url} controls autoPlay className="viewer-video" />
                ) : (
                  <img src={selectedMedia.url} alt={selectedMedia.title} className="viewer-image" />
                )}
              </div>
              
              <div className="viewer-details">
                <span className="viewer-year">{selectedMedia.year}</span>
                <h2>{selectedMedia.title}</h2>
                <p>{selectedMedia.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallerypage;
