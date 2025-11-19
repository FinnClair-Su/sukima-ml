import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const SukimaGap: React.FC = () => {
  const [eyes, setEyes] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random eyes
    const newEyes = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10% to 90% width
      y: Math.random() * 60 + 20, // 20% to 80% height
      size: Math.random() * 20 + 10,
      speed: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }));
    setEyes(newEyes);
  }, []);

  return (
    <div className={styles.container}>
      {/* The Gap Shape and Mask */}
      <svg className={styles.gapShape} viewBox="0 0 800 200" preserveAspectRatio="none">
        <defs>
          <mask id="gapMask">
            <path 
              d="M 50,100 C 200,20 600,20 750,100 C 600,180 200,180 50,100 Z" 
              fill="white" 
            />
          </mask>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background of the gap */}
        <path 
          d="M 50,100 C 200,20 600,20 750,100 C 600,180 200,180 50,100 Z" 
          fill="black" 
          stroke="#800080" 
          strokeWidth="3"
          filter="url(#glow)"
        />

        {/* Eyes Container - Masked */}
        <g mask="url(#gapMask)">
          {eyes.map((eye) => (
            <g key={eye.id} transform={`translate(${eye.x * 8}, ${eye.y * 2})`}> {/* Scale to viewBox */}
               <foreignObject x={-eye.size/2} y={-eye.size/2} width={eye.size} height={eye.size}>
                 <div 
                   className={styles.eye} 
                   style={{ 
                     width: eye.size, 
                     height: eye.size, 
                     animationDuration: `${eye.speed}s`,
                     animationDelay: `-${eye.delay}s`
                   }} 
                 />
               </foreignObject>
            </g>
          ))}
        </g>
      </svg>

      {/* Bows at the ends */}
      {/* We'll use simple SVGs for bows for better control than CSS shapes */}
      <div className={styles.bowLeft} style={{ position: 'absolute', left: '5%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <BowColor />
      </div>
      <div className={styles.bowRight} style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translate(50%, -50%)' }}>
        <BowColor />
      </div>
    </div>
  );
};

const BowColor = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="red" stroke="darkred" strokeWidth="2">
    <path d="M 50,50 C 30,30 10,10 10,40 C 10,70 40,60 50,50 C 60,60 90,70 90,40 C 90,10 70,30 50,50 Z" />
    <path d="M 50,50 L 30,80 L 45,90 L 50,60 L 55,90 L 70,80 Z" />
  </svg>
);

export default SukimaGap;
