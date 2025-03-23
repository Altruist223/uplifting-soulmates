
import React, { useState, useEffect } from 'react';

type BreathingPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2' | 'paused';

const BreathingExercise = () => {
  const [phase, setPhase] = useState<BreathingPhase>('paused');
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('Press start when ready');
  
  // Phase durations in seconds
  const durations = {
    inhale: 4,
    hold1: 4,
    exhale: 6,
    hold2: 2,
  };
  
  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive) {
      interval = window.setInterval(() => {
        setCount(prevCount => {
          const newCount = prevCount + 1;
          
          // Determine if we need to switch phases
          if (phase === 'inhale' && newCount >= durations.inhale) {
            setPhase('hold1');
            setMessage('Hold');
            return 0;
          } else if (phase === 'hold1' && newCount >= durations.hold1) {
            setPhase('exhale');
            setMessage('Breathe Out');
            return 0;
          } else if (phase === 'exhale' && newCount >= durations.exhale) {
            setPhase('hold2');
            setMessage('Hold');
            return 0;
          } else if (phase === 'hold2' && newCount >= durations.hold2) {
            setPhase('inhale');
            setMessage('Breathe In');
            return 0;
          }
          
          return newCount;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, phase]);
  
  const toggleExercise = () => {
    if (!isActive) {
      setPhase('inhale');
      setMessage('Breathe In');
      setCount(0);
    } else {
      setPhase('paused');
      setMessage('Press start when ready');
    }
    setIsActive(!isActive);
  };
  
  // Determine circle size based on breathing phase
  const getCircleSize = () => {
    if (phase === 'inhale') {
      return 50 + (count / durations.inhale) * 50;
    } else if (phase === 'exhale') {
      return 100 - (count / durations.exhale) * 50;
    }
    return phase === 'paused' ? 50 : 100;
  };
  
  const size = getCircleSize();
  
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative mb-8 flex items-center justify-center">
        <div 
          className="absolute rounded-full bg-primary/5 transition-all duration-1000 ease-in-out"
          style={{ 
            width: `${size * 2}px`, 
            height: `${size * 2}px`,
          }}
        ></div>
        <div 
          className="absolute rounded-full bg-primary/10 transition-all duration-1000 ease-in-out"
          style={{ 
            width: `${size * 1.5}px`, 
            height: `${size * 1.5}px`,
          }}
        ></div>
        <div 
          className="rounded-full bg-primary/20 flex items-center justify-center text-primary transition-all duration-1000 ease-in-out"
          style={{ 
            width: `${size}px`, 
            height: `${size}px`,
          }}
        >
          {phase !== 'paused' && count}
        </div>
      </div>
      
      <p className="text-xl font-light mb-6 h-8 text-center">{message}</p>
      
      <button
        onClick={toggleExercise}
        className="px-6 py-2 rounded-full bg-primary text-white font-medium 
          hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 
          focus:ring-primary/50 focus:ring-offset-2"
      >
        {isActive ? 'Pause' : 'Start'}
      </button>
      
      <div className="mt-10 max-w-md text-center">
        <h3 className="text-sm uppercase tracking-wider text-primary/70 font-medium mb-2">
          4-4-6-2 Breathing Technique
        </h3>
        <p className="text-sm text-foreground/70">
          This technique helps reduce anxiety and calm your nervous system.
          Inhale for 4 seconds, hold for 4, exhale for 6, and hold for 2.
        </p>
      </div>
    </div>
  );
};

export default BreathingExercise;
