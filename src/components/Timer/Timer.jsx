import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Timer.css';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set the target date for Vinayaka Chaviti 2024 (September 7, 2024)
  const targetDate = new Date('2024-09-07T00:00:00');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ months, days, hours, minutes, seconds });
      } else {
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Months', value: timeLeft.months },
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="timer-container">
      <div className="timer-grid">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            className="timer-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.div
              className="timer-value"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
            >
              {String(unit.value).padStart(2, '0')}
            </motion.div>
            <div className="timer-label">{unit.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timer;