import React, { useRef, useEffect, useState } from 'react';
import styles from './styles.module.css';

interface LiquidCardProps {
    children: React.ReactNode;
    className?: string;
}

const LiquidCard: React.FC<LiquidCardProps> = ({ children, className }) => {
    const filterId = useRef(`liquid-filter-${Math.random().toString(36).substr(2, 9)}`).current;
    const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
    const requestRef = useRef<number | undefined>(undefined);
    const [isHovered, setIsHovered] = useState(false);
    const timeRef = useRef(0);

    const animate = () => {
        if (turbulenceRef.current) {
            timeRef.current += 0.01;
            // Animate baseFrequency to create flowing liquid effect
            // baseFrequency="0.01 0.05" -> animate the second value
            const freqX = 0.01 + Math.sin(timeRef.current) * 0.005;
            const freqY = 0.05 + Math.cos(timeRef.current) * 0.01;
            turbulenceRef.current.setAttribute('baseFrequency', `${freqX} ${freqY}`);
        }
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isHovered) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isHovered]);

    return (
        <div
            className={`${styles.cardContainer} ${className || ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>

            {/* The Liquid Overlay */}
            <div
                className={styles.liquidOverlay}
                style={{ filter: `url(#${filterId})` }}
            />

            {/* SVG Filter Definition */}
            <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
                <filter id={filterId}>
                    <feTurbulence
                        ref={turbulenceRef}
                        type="fractalNoise"
                        baseFrequency="0.01 0.05"
                        numOctaves="3"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="20"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                    {/* Add some color tinting for the "colored frosted glass" effect */}
                    <feColorMatrix
                        type="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                        result="goo"
                    />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
            </svg>
        </div>
    );
};

export default LiquidCard;
