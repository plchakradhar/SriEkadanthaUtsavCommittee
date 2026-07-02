import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Homepage.css';

import img1 from '../../assets/images/festival1.jpg';
import img2 from '../../assets/images/festival2.jpg';
import img3 from '../../assets/images/festival3.jpg';
import img4 from '../../assets/images/festival4.jpg';
import img5 from '../../assets/images/festival5.jpg';
import img6 from '../../assets/images/festival6.jpg';
import img7 from '../../assets/images/festival7.jpg';
import img8 from '../../assets/images/festival8.jpg';

/* ─────────────────────────────────────────────────────────────
   Sudarshana Chakram SVG  (decorative background wheel)
───────────────────────────────────────────────────────────── */
const ChakramBg = () => {
  const C = 300;           // center
  const R_OUTER  = 272;    // outer ring
  const R_INNER1 = 232;    // spoke ring 1
  const R_INNER2 = 186;    // spoke ring 2
  const R_INNER3 = 136;    // spoke ring 3
  const R_HUB    = 40;     // hub
  const N_SPOKES = 24;
  const N_TEETH  = 48;     // flame teeth on outer edge

  const polar = (angleDeg, r) => ({
    x: C + r * Math.cos((angleDeg * Math.PI) / 180),
    y: C + r * Math.sin((angleDeg * Math.PI) / 180),
  });

  // Triangular flame teeth around outer rim
  const teeth = Array.from({ length: N_TEETH }).map((_, i) => {
    const a1  = (i       / N_TEETH) * 360;
    const aMid= ((i + 0.5) / N_TEETH) * 360;
    const a2  = ((i + 1)   / N_TEETH) * 360;
    const p1  = polar(a1,   R_OUTER);
    const tip = polar(aMid, R_OUTER + 26);
    const p2  = polar(a2,   R_OUTER);
    return { pts: `${p1.x},${p1.y} ${tip.x},${tip.y} ${p2.x},${p2.y}`, i };
  });

  // 24 spokes (every 3rd is bolder)
  const spokes = Array.from({ length: N_SPOKES }).map((_, i) => {
    const angle = (i / N_SPOKES) * 360;
    const inner = polar(angle, R_HUB);
    const outer = polar(angle, R_OUTER);
    return { inner, outer, bold: i % 3 === 0 };
  });

  // 8 decorative dots on inner ring 2
  const dots8  = Array.from({ length: 8  }).map((_, i) => polar((i / 8)  * 360, R_INNER2));
  const dots12 = Array.from({ length: 12 }).map((_, i) => polar((i / 12) * 360, R_INNER1));

  return (
    <svg className="chakram-bg" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hubG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFDA62" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFDA62" stopOpacity="0"    />
        </radialGradient>
        <radialGradient id="outerG" cx="50%" cy="50%" r="50%">
          <stop offset="70%"  stopColor="transparent" />
          <stop offset="90%"  stopColor="#E89951"     stopOpacity="0.07" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Outer ambient glow */}
      <circle cx={C} cy={C} r={R_OUTER + 28} fill="url(#outerG)" />

      {/* Flame teeth */}
      {teeth.map(({ pts, i }) => (
        <polygon
          key={i}
          points={pts}
          fill={`rgba(255,200,60,${i % 2 === 0 ? 0.17 : 0.09})`}
        />
      ))}

      {/* Main rings */}
      <circle cx={C} cy={C} r={R_OUTER}  fill="none" stroke="rgba(255,200,60,0.26)" strokeWidth="3"   />
      <circle cx={C} cy={C} r={R_INNER1} fill="none" stroke="rgba(255,200,60,0.17)" strokeWidth="1.5" />
      <circle cx={C} cy={C} r={R_INNER2} fill="none" stroke="rgba(255,200,60,0.14)" strokeWidth="1.5" />
      <circle cx={C} cy={C} r={R_INNER3} fill="none" stroke="rgba(255,200,60,0.11)" strokeWidth="1"   />

      {/* Spokes */}
      {spokes.map(({ inner, outer, bold }, i) => (
        <line
          key={i}
          x1={inner.x} y1={inner.y}
          x2={outer.x} y2={outer.y}
          stroke={`rgba(255,200,60,${bold ? 0.22 : 0.10})`}
          strokeWidth={bold ? 2.5 : 1.2}
        />
      ))}

      {/* Hub */}
      <circle cx={C} cy={C} r={R_HUB}      fill="url(#hubG)"              stroke="rgba(255,200,60,0.38)" strokeWidth="2.5" />
      <circle cx={C} cy={C} r={R_HUB - 14} fill="none"                    stroke="rgba(255,200,60,0.20)" strokeWidth="1"   />
      <circle cx={C} cy={C} r={10}          fill="rgba(255,200,60,0.30)"   />

      {/* Accent dots */}
      {dots8.map((p, i)  => <circle key={i} cx={p.x} cy={p.y} r="6" fill="rgba(255,200,60,0.22)" />)}
      {dots12.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill="rgba(255,200,60,0.17)" />)}
    </svg>
  );
};

/* ─────────────────────────────────────────────────────────────
   Fan position data (7 visible slots)
   Each card is centred at x=0 inside a perspective container
   and spread via translateX + rotateY
───────────────────────────────────────────────────────────── */
const SLOTS = [
  { x: -300, z: -95,  rotY: -28, scale: 0.72, opacity: 0.52 },
  { x: -150, z: -32,  rotY: -14, scale: 0.87, opacity: 0.76 },
  { x:    0, z:  45,  rotY:   0, scale: 1.00, opacity: 1.00 }, // center
  { x:  150, z: -32,  rotY:  14, scale: 0.87, opacity: 0.76 },
  { x:  300, z: -95,  rotY:  28, scale: 0.72, opacity: 0.52 },
];

const CARD_DATA = [img1, img2, img3, img4, img5, img6, img7, img8, null];
const TOTAL = CARD_DATA.length; // 9

/* ─────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────── */
const Homepage = () => {
  const [centerIdx, setCenterIdx] = useState(0);
  const [isTelugu,  setIsTelugu]  = useState(false);

  const getCard = (offset) =>
    CARD_DATA[((centerIdx + offset) % TOTAL + TOTAL) % TOTAL];

  const prev = () => setCenterIdx((i) => (i - 1 + TOTAL) % TOTAL);
  const next = () => setCenterIdx((i) => (i + 1) % TOTAL);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prev();
    } else if (info.offset.x < -swipeThreshold) {
      next();
    }
  };

  return (
    <div className="homepage">
      {/* Chakram background */}
      <ChakramBg />
      <div className="bg-overlay" />

      <div className="hero-content">
        {/* ── Title ── */}
        <motion.div
          className="title-container"
          onClick={() => setIsTelugu((p) => !p)}
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={isTelugu ? 'te' : 'en'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="main-title"
            >
              {isTelugu
                ? 'శ్రీ ఏకదంత ఉత్సవ సమితి'
                : 'Sri Ekadantha Utsav Committee'}
            </motion.h1>
          </AnimatePresence>
          <p className="click-hint">✦ Tap to translate ✦</p>
        </motion.div>

        {/* ── Fan gallery ── */}
        <motion.div
          className="fan-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
        >
          {/* Perspective stage with Drag */}
          <motion.div 
            className="fan-stage"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{ cursor: 'grab' }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {/* Ground reflection glow */}
            <div className="stage-ground" />

            {SLOTS.map((slot, slotIdx) => {
              const offset = slotIdx - 2; // -2 … +2
              const imgSrc = getCard(offset);
              const isCenter = slotIdx === 2;

              return (
                <div
                  key={slotIdx}
                  className="gallery-wrapper"
                  onClick={() => setCenterIdx((i) => (i + offset + TOTAL) % TOTAL)}
                  style={{
                    transform: `translateX(${slot.x}px) translateZ(${slot.z}px) rotateY(${slot.rotY}deg) scale(${slot.scale})`,
                    opacity:   slot.opacity,
                    zIndex:    Math.round(slot.scale * 10),
                    transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.55s ease',
                    cursor:    isCenter ? 'grab' : 'pointer'
                  }}
                >
                  <div className={`gallery-card${isCenter ? ' center-card' : ''}`}>
                    {imgSrc !== null ? (
                      <>
                        <img src={imgSrc} alt="Festival" draggable={false} />
                        <div className="card-shine" />
                      </>
                    ) : (
                      <div className="qm-inner">
                        <span className="qm-char">?</span>
                        <p className="qm-sub">Coming Soon</p>
                      </div>
                    )}
                  </div>

                  {/* Floor reflection */}
                  {isCenter && <div className="floor-reflection" />}
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        <p className="nav-hint">◀ Swipe or tap images to browse ▶</p>
      </div>
    </div>
  );
};

export default Homepage;