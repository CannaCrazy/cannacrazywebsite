
import React, { useEffect, useState } from 'react';

const Particle: React.FC<{ color: string }> = ({ color }) => {
  const [position, setPosition] = useState({ 
    top: Math.random() * 100, 
    left: Math.random() * 100 
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => ({
        top: (prev.top + (Math.random() - 0.5) * 5) % 100,
        left: (prev.left + (Math.random() - 0.5) * 5) % 100,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="absolute rounded-full pointer-events-none transition-all duration-[3000ms] ease-in-out blur-xl opacity-20"
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
        width: `${Math.random() * 150 + 50}px`,
        height: `${Math.random() * 150 + 50}px`,
        backgroundColor: color,
      }}
    />
  );
};

export const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="absolute inset-0 shimmer-grid opacity-20"></div>
      <Particle color="#39FF14" />
      <Particle color="#BC13FE" />
      <Particle color="#FBFF00" />
      <Particle color="#00D2FF" />
      <Particle color="#FF8C00" />
      
      {/* Parallax Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[120px] animate-pulse"></div>
    </div>
  );
};
