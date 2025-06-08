import React, { useState, useEffect } from 'react';

const DailyCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const estOffset = -4;
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const estTime = new Date(utc + (3600000 * estOffset));
      
      const tomorrow = new Date(estTime);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const diffMs = tomorrow.getTime() - estTime.getTime();
      const diffHrs = Math.floor(diffMs / 3600000);
      const diffMins = Math.floor((diffMs % 3600000) / 60000);
      const diffSecs = Math.floor((diffMs % 60000) / 1000);
      
      setTimeLeft({
        hours: diffHrs,
        minutes: diffMins,
        seconds: diffSecs
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-sm text-muted-foreground">
      Next challenge in{' '}
      <span className="font-medium">
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

export default DailyCountdown;