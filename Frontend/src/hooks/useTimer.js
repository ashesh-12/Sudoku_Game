import { useState, useEffect } from 'react';

export default function useTimer(isActive = false, resetTrigger = 0) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (resetTrigger > 0) setSeconds(0); // Reset immediately on trigger
  }, [resetTrigger]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}`;

  return { seconds, formattedTime };
}
