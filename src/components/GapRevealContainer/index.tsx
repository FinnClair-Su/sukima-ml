import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import styles from './styles.module.css';

interface GapRevealContainerProps {
    children: React.ReactNode;
    mode: 'load' | 'scroll';
    className?: string;
    defaultOpen?: boolean;
}

const GapRevealContainer: React.FC<GapRevealContainerProps> = ({
    children,
    mode,
    className,
    defaultOpen = false
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const containerRef = useRef<HTMLDivElement>(null);
    const [eyes, setEyes] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number; delay: number }>>([]);

    const [progress, setProgress] = useState(defaultOpen ? 1 : 0);

    // Generate random eyes
    useEffect(() => {
        // Increase eye count for better density
        const newEyes = Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            x: Math.random() * 90 + 5, // 5% to 95% width
            y: Math.random() * 80 + 10, // 10% to 90% height
            size: Math.random() * 15 + 8, // Slightly larger eyes
            speed: Math.random() * 4 + 2,
            delay: Math.random() * 2,
        }));
        setEyes(newEyes);
    }, []);

    // Auto-close timer ref
    const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Handle modes
    useEffect(() => {
        if (mode === 'load') {
            const timer = setTimeout(() => setIsOpen(true), 500);
            return () => clearTimeout(timer);
        } else if (mode === 'scroll') {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setIsOpen(true);
                        }
                    });
                },
                { threshold: 0.2 }
            );

            if (containerRef.current) {
                observer.observe(containerRef.current);
            }

            return () => observer.disconnect();
        }
    }, [mode]);

    // Mouse interaction handlers
    const handleMouseEnter = () => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
        }
        // "Change close time to 1 second"
        closeTimerRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 1000);
    };

    // Animation Loop for smooth opening
    useEffect(() => {
        let animationFrame: number;
        const target = isOpen ? 1 : 0;

        const animate = () => {
            setProgress(prev => {
                const diff = target - prev;
                // "Opening speed to 75% of current (0.05 -> ~0.038)"
                // "Closing speed to 50% of current (0.03 -> 0.015)"
                const speed = target === 1 ? 0.038 : 0.015;

                if (Math.abs(diff) < 0.001) return target;
                return prev + diff * speed;
            });

            if (Math.abs(target - progress) > 0.001) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isOpen, progress]);

    // Calculate Path Data based on progress (0 to 1)
    // Slit: M 0,0.5 C 0.4,0.48 0.6,0.48 1,0.5 C 0.6,0.52 0.4,0.52 0,0.5 Z
    // Open: M 0,0.5 C 0.1,0 0.9,0 1,0.5 C 0.9,1 0.1,1 0,0.5 Z

    // Interpolate Control Points
    const topCPY = 0.48 - (0.48 * progress); // 0.48 -> 0
    const bottomCPY = 0.52 + (0.48 * progress); // 0.52 -> 1

    // Interpolate Control Points X to make it wider/rounder
    // Slit X: 0.35/0.65 -> Open X: 0.02/0.98 (Very wide)
    const cpX1 = 0.35 - (0.33 * progress);
    const cpX2 = 0.65 + (0.33 * progress);

    const pathData = `M 0,0.5 C ${cpX1},${topCPY} ${cpX2},${topCPY} 1,0.5 C ${cpX2},${bottomCPY} ${cpX1},${bottomCPY} 0,0.5 Z`;

    const uniqueId = useRef(`gap-clip-${Math.random().toString(36).substr(2, 9)}`).current;

    // Calculate padding based on mode to increase height/width
    const isCounter = mode === 'load';
    const wrapperStyle = {
        clipPath: `url(#${uniqueId})`,
        padding: isCounter ? '4rem 8rem' : '6rem 5rem', // Even more padding
    };

    return (
        <div
            ref={containerRef}
            className={clsx(styles.container, className)}
        >
            {/* Hit Area for Mouse Detection - Restricted Range */}
            <div
                className={styles.hitArea}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />

            {/* SVG Definition for Clip Path */}
            <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
                <defs>
                    <clipPath id={uniqueId} clipPathUnits="objectBoundingBox">
                        <path d={pathData} />
                    </clipPath>
                </defs>
            </svg>

            {/* Content Wrapper - Clipped */}
            <div
                className={styles.contentWrapper}
                style={wrapperStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Black Background inside the Gap */}
                <div className={styles.gapInterior}>
                    {/* Eyes inside the gap */}
                    {eyes.map((eye) => (
                        <div
                            key={eye.id}
                            className={styles.eye}
                            style={{
                                left: `${eye.x}%`,
                                top: `${eye.y}%`,
                                width: `${eye.size}px`,
                                height: `${eye.size}px`,
                                animationDuration: `${eye.speed}s`,
                                animationDelay: `-${eye.delay}s`,
                                opacity: 0.7
                            }}
                        />
                    ))}
                </div>

                {/* Actual Content */}
                <div className={styles.contentInner}>
                    {children}
                </div>
            </div>

            {/* Border Overlay */}
            <svg
                className={styles.borderOverlay}
                viewBox="0 0 1 1"
                preserveAspectRatio="none"
            >
                <path
                    d={pathData}
                    fill="none"
                    stroke="#800080"
                    strokeWidth="0.005"
                    vectorEffect="non-scaling-stroke"
                    className={styles.gapBorder}
                />
            </svg>

            {/* Bows */}
            <div className={styles.bowLeft}>
                <BowColor />
            </div>
            <div className={styles.bowRight}>
                <BowColor />
            </div>
        </div>
    );
};

const BowColor = () => (
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="red" stroke="darkred" strokeWidth="5">
        <path d="M 50,50 C 30,30 10,10 10,40 C 10,70 40,60 50,50 C 60,60 90,70 90,40 C 90,10 70,30 50,50 Z" />
        <path d="M 50,50 L 30,80 L 45,90 L 50,60 L 55,90 L 70,80 Z" />
    </svg>
);

export default GapRevealContainer;
