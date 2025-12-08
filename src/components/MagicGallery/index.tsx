import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import clsx from 'clsx';
import { useHistory } from '@docusaurus/router';
import { artworks } from '../../data/galleryData'; // Import shared data

interface MagicGalleryProps {
    className?: string; // e.g., h-[80vh]
}

type DialogueState = 'idle' | 'intro_original' | 'intro_touhou' | 'options';

export default function MagicGallery({ className }: MagicGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [direction, setDirection] = useState(0);
    const [generations, setGenerations] = useState<Record<string, number>>({});

    // Dialogue System State
    const [dialogueStep, setDialogueStep] = useState<DialogueState>('idle');

    const history = useHistory();
    const [isMobile, setIsMobile] = useState(false);
    const imageRef = React.useRef<HTMLImageElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Reset dialogue when changing artwork
    useEffect(() => {
        setDialogueStep('idle');
    }, [currentIndex]);

    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        if (dialogueStep === 'idle') {
            setDialogueStep('intro_original');
        }
    };

    const advanceDialogue = () => {
        if (dialogueStep === 'intro_original') setDialogueStep('intro_touhou');
        else if (dialogueStep === 'intro_touhou') setDialogueStep('options');
    };

    const getIndex = (index: number) => {
        const len = artworks.length;
        return ((index % len) + len) % len;
    };

    const handleNext = () => {
        setDirection(1);
        setDialogueStep('idle');
        const leftIndex = getIndex(currentIndex - 1);
        const leftId = artworks[leftIndex].id;
        setGenerations(prev => ({ ...prev, [leftId]: (prev[leftId] || 0) + 1 }));
        setCurrentIndex((prev) => prev + 1);
    };

    const handlePrev = () => {
        setDirection(-1);
        setDialogueStep('idle');
        const rightIndex = getIndex(currentIndex + 1);
        const rightId = artworks[rightIndex].id;
        setGenerations(prev => ({ ...prev, [rightId]: (prev[rightId] || 0) + 1 }));
        setCurrentIndex((prev) => prev - 1);
    };

    const centerItem = artworks[getIndex(currentIndex)];
    const leftItem = artworks[getIndex(currentIndex - 1)];
    const rightItem = artworks[getIndex(currentIndex + 1)];

    const getKey = (item: typeof centerItem) => `${item.id}-${generations[item.id] || 0}`;

    // Tuned variants for "Gallery Walk"
    const cardVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? '100vw' : '-100vw',
            scale: 0.6,
            opacity: 0,
            zIndex: 5,
            rotateY: dir > 0 ? -45 : 45,
            transition: { duration: 1, ease: "easeInOut" as const }
        }),
        center: {
            x: 0,
            scale: 1,
            opacity: 1,
            zIndex: 30,
            filter: 'brightness(1)',
            rotateY: 0,
            transition: { duration: 1, ease: "easeInOut" as const },
        },
        left: {
            x: isMobile ? '-92%' : '-65vw', // Mobile peek
            scale: 0.8,
            opacity: 0.8,
            zIndex: 10,
            filter: 'brightness(0.5) blur(2px)',
            rotateY: isMobile ? 0 : 25,
            transition: { duration: 1, ease: "easeInOut" as const },
        },
        right: {
            x: isMobile ? '92%' : '65vw',
            scale: 0.8,
            opacity: 0.8,
            zIndex: 10,
            filter: 'brightness(0.5) blur(2px)',
            rotateY: isMobile ? 0 : -25,
            transition: { duration: 1, ease: "easeInOut" as const },
        },
        exit: (dir: number) => ({
            x: dir > 0 ? '-100vw' : '100vw',
            scale: 0.6,
            opacity: 0,
            zIndex: 5,
            rotateY: dir > 0 ? 45 : -45,
            transition: { duration: 1, ease: "easeInOut" as const }
        })
    };

    // --- Sub-Component: Dual Frame ---
    // Represents a section of a white wall with two distinct framed paintings hung on it.
    const DualGalleryFrame = ({ artwork, isActive = false }: { artwork: any, isActive?: boolean }) => (
        <div
            className={clsx(
                "relative transition-all duration-500 flex items-center justify-center",
                // The Container acts as the "Wall" - NOW TRANSPARENT
                // Mobile: Compact stacked. Desktop: Landscape.
                "w-[75vw] h-[110vw] md:w-[950px] md:h-[600px] bg-transparent",
                // Removed outer shadow to prevent "card" look.
            )}>

            {/* Removed Wall Texture/Gradient to ensure true transparency */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" /> */}

            <div className="flex flex-col md:flex-row gap-4 md:gap-16 items-center justify-center p-4 md:p-12 w-full h-full">

                {/* LEFT: Original Painting Frame */}
                <div className={clsx(
                    "relative flex-1 w-full h-full bg-[#1a1a1a] p-[8px] md:p-[12px] flex flex-col group transition-transform duration-300 hover:scale-[1.01]",
                    isActive ? "shadow-[0_20px_50px_rgba(0,0,0,0.6)]" : "shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
                )}>

                    {/* Label */}
                    <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 bg-white/90 text-black text-[10px] md:text-xs font-serif uppercase tracking-widest px-3 py-1 shadow-sm opacity-60 group-hover:opacity-100 transition-opacity">
                        原作名画
                    </div>

                    {/* Matting (The white paper part of a frame) */}
                    <div className="relative w-full h-full bg-[#fdfbf7] flex items-center justify-center overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]">
                        {/* Inner Shadow for depth (sits on top of image) */}
                        <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.15)] rounded-[2px]" />

                        {/* The Art */}
                        <div className="relative z-10 w-full h-full p-4 md:p-6 flex items-center justify-center">
                            <img src={artwork.originalImagePath} alt="Original" className="max-w-full max-h-full object-contain drop-shadow-md" />
                        </div>
                    </div>
                </div>

                {/* RIGHT: Touhou Version Frame */}
                <div className={clsx(
                    "relative flex-1 w-full h-full bg-[#1a1a1a] p-[8px] md:p-[12px] flex flex-col group transition-transform duration-300 hover:scale-[1.01]",
                    isActive ? "shadow-[0_20px_50px_rgba(0,0,0,0.6)]" : "shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
                )}>

                    <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 bg-[#b71c1c]/90 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1 shadow-sm opacity-60 group-hover:opacity-100 transition-opacity">
                        东方Project同人
                    </div>

                    <div className="relative w-full h-full bg-[#fdfbf7] flex items-center justify-center overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]">
                        <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.15)] rounded-[2px]" />

                        <div className="relative z-10 w-full h-full p-4 md:p-6 flex items-center justify-center">
                            <img src={artwork.imagePath} alt="Touhou" className="max-w-full max-h-full object-contain drop-shadow-md" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

    return (
        <div
            className={clsx(
                "relative w-full overflow-hidden flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#222]",
                className
            )}
            onClick={() => setDialogueStep('idle')} // Close dialogue if clicking bg
        >

            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.1] mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}
            />

            {/* Seamless Gradient at Top to blend with Hero */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#f4f1ea] to-transparent z-10 pointer-events-none opacity-50" />

            {/* --- The Stage --- */}
            <div className="relative w-full h-full flex items-center justify-center perspective-1500 scale-90 md:scale-100">

                {/* LAYER 1: The Carousel */}
                <div className="relative flex items-center justify-center z-20">
                    <AnimatePresence initial={false} mode='popLayout' custom={direction}>
                        {/* LEFT */}
                        <motion.div
                            key={getKey(leftItem)} custom={direction}
                            className="absolute cursor-pointer"
                            variants={cardVariants}
                            initial="enter" animate="left" exit="exit"
                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        >
                            <DualGalleryFrame artwork={leftItem} />
                        </motion.div>

                        {/* RIGHT */}
                        <motion.div
                            key={getKey(rightItem)} custom={direction}
                            className="absolute cursor-pointer"
                            variants={cardVariants}
                            initial="enter" animate="right" exit="exit"
                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        >
                            <DualGalleryFrame artwork={rightItem} />
                        </motion.div>

                        {/* CENTER */}
                        <motion.div
                            key={getKey(centerItem)} custom={direction}
                            className="absolute"
                            variants={cardVariants}
                            initial="enter" animate="center" exit="exit"
                        >
                            <DualGalleryFrame artwork={centerItem} isActive={true} />
                        </motion.div>
                    </AnimatePresence>
                </div>



                {/* Navigation Buttons (Mobile) - Positioned higher now */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 z-50 md:hidden">
                    <button onClick={handlePrev} className="group p-2 bg-white/20 rounded-full backdrop-blur"><ChevronLeft className="text-black/60" /></button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-4 z-50 md:hidden">
                    <button onClick={handleNext} className="group p-2 bg-white/20 rounded-full backdrop-blur"><ChevronRight className="text-black/60" /></button>
                </div>

            </div>

            {/* LAYER 2: Yukari Overlay (Anchored Bottom) - MOVED OUTSIDE SCALED STAGE */}
            {/* Using h-full items-end to anchor her feet to the bottom of the container */}
            <div className="absolute inset-0 z-40 pointer-events-none flex items-end justify-center overflow-hidden">
                <img
                    ref={imageRef}
                    src="/img/yukari.png"
                    alt="Yukari Yakumo"
                    crossOrigin="anonymous"
                    className={clsx(
                        "w-auto h-[60vh] md:h-[95vh] object-contain transition-all duration-500 cursor-pointer origin-bottom",
                        dialogueStep !== 'idle' ? "brightness-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" : "brightness-100"
                    )}
                    style={{
                        filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
                        // Mobile: 0 (grounded). Desktop: 25% (lowered) -> 0 (revealed)
                        transform: isMobile
                            ? (dialogueStep !== 'idle' ? "translateY(5px) scale(1.02)" : "translateY(0)")
                            : (dialogueStep !== 'idle' ? "translateY(0) scale(1.02)" : "translateY(25%)"),
                        pointerEvents: isMobile ? 'none' : 'auto',
                    }}
                    onClick={!isMobile ? handleImageClick : undefined}
                />
            </div>

            {/* Mobile Trigger Zone (Bottom 1/3) */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[35%] z-40 cursor-pointer md:hidden"
                onClick={handleImageClick}
            />

            {/* LAYER 3: Galgame Dialogue Box - FIXED Bottom Overlay */}
            <AnimatePresence>
                {dialogueStep !== 'idle' && (
                    <motion.div
                        initial={{ y: 300, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 300, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 z-[100] h-[220px] bg-gradient-to-t from-black via-black/90 to-transparent flex justify-center items-end pb-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full max-w-4xl mx-4 bg-black/80 backdrop-blur-md border-t border-white/20 p-6 rounded-t-2xl shadow-2xl">

                            {/* Character Name Tag */}
                            <div className="absolute -top-5 left-8 bg-[#b71c1c] text-white px-8 py-1 text-xl font-bold font-serif shadow-lg skew-x-[-15deg] border border-white/20">
                                <span className="skew-x-[15deg] block">八云 紫</span>
                            </div>

                            <div className="flex flex-col h-full justify-between" onClick={advanceDialogue}>
                                {/* Text Content */}
                                <div className="text-white/90 font-serif text-xl leading-relaxed mt-2 min-h-[80px]">
                                    {dialogueStep === 'intro_original' && (
                                        <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                            {centerItem.introOriginal || `这是 "${centerItem.originalPainting}"。一幅超越时代的经典之作。`}
                                        </motion.p>
                                    )}
                                    {dialogueStep === 'intro_touhou' && (
                                        <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                            {centerItem.introTouhou || `而在我们的幻想乡，它变成了 "${centerItem.touhouCharacter}"。这是幻想与现实的隙间。`}
                                        </motion.p>
                                    )}
                                    {dialogueStep === 'options' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
                                            <p className="text-gray-300">接下来怎么做？</p>
                                            <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-2">
                                                <button className="flex-1 min-w-[200px] bg-white/10 hover:bg-[#b71c1c] border border-white/30 px-4 py-3 rounded text-left transition-colors flex items-center gap-3 group text-white"
                                                    onClick={() => history.push('/giclee')}>
                                                    <span className="bg-white/20 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">A</span>
                                                    <span className="group-hover:translate-x-1 transition-transform">鉴赏“再现”的魔术 (Giclee)</span>
                                                </button>
                                                <button className="flex-1 min-w-[200px] bg-white/10 hover:bg-[#b71c1c] border border-white/30 px-4 py-3 rounded text-left transition-colors flex items-center gap-3 group text-white"
                                                    onClick={() => history.push(centerItem.link)}>
                                                    <span className="bg-white/20 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">B</span>
                                                    <span className="group-hover:translate-x-1 transition-transform">收藏这份“境界” (Purchase)</span>
                                                </button>
                                                <button className="flex-1 min-w-[200px] bg-white/10 hover:bg-gray-800 border border-white/30 px-4 py-3 rounded text-left transition-colors flex items-center gap-3 group text-white"
                                                    onClick={() => setDialogueStep('idle')}>
                                                    <span className="bg-white/20 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">C</span>
                                                    <span className="group-hover:translate-x-1 transition-transform">假装无事发生 (Close)</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Prompt */}
                                {dialogueStep !== 'options' && (
                                    <div className="text-right text-sm text-gray-500 animate-pulse">
                                        ▶ 点击继续
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
