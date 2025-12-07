import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useHistory } from '@docusaurus/router';

// --- Data ---
const artworks = [
  {
    id: '001',
    title: '戴珍珠耳环的17岁少女',
    subtitle: 'YUKARI YAKUMO',
    imagePath: '/img/artworks/yukari_v0.5.jpg',
    link: '/artwork-001',
    artist: 'Sukima-ML Official',
    description: '“初次见面的外界人，您好！此乃我流落外界的真容。将我的肖像挂在你的墙上，时刻注视，便是在为我重塑神格。”'
  },
  {
    id: '003',
    title: '蓬莱宫娥',
    subtitle: 'Las Meninas × Touhou',
    imagePath: '/img/artworks/artwork-003.jpg',
    link: '/artwork-003',
    artist: 'amibazh (Pixiv: 1500528)',
    description: '致敬委拉斯开兹名作《宫娥》。永远亭的辉夜姬与妹红、铃仙等人的日常。'
  },
  {
    id: '002',
    title: 'The Bookworm × Pachouli',
    subtitle: 'Dual Version❤️',
    imagePath: '/img/artworks/Variant_B.jpg',
    link: '/artwork-002',
    artist: '青未Q，pixiv 103691477',
    description: 'The weight of Knowledge, or the forbidden Knowledge？'
  },
];

// --- Constants ---
const YUKARI_BASE_WIDTH_PX = 750; // Increased to match new artwork width (500px / 0.666)

export default function MagicGallery() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [showInfo, setShowInfo] = useState(false); // State for Yukari's popup
  const [direction, setDirection] = useState(0); // Optional: tracking direction for smoother intent? Not strictly needed with simple layout
  const history = useHistory();

  const getIndex = (index: number) => {
    const len = artworks.length;
    return ((index % len) + len) % len;
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setShowInfo(false); // Close info on move
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
    setShowInfo(false);
  };

  const centerItem = artworks[getIndex(currentIndex)];
  const leftItem = artworks[getIndex(currentIndex - 1)];
  const rightItem = artworks[getIndex(currentIndex + 1)];

  const handleCenterClick = () => {
    history.push(centerItem.link);
  };

  const toggleInfo = (e) => {
    e.stopPropagation();
    setShowInfo(!showInfo);
  };

  // Tuned variants for "Gallery Walk" - Pushed to edges
  const cardVariants = {
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 30,
      filter: 'brightness(1)',
      rotateY: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    left: {
      x: '-45vw', // Push to screen edge (45% of viewport)
      scale: 0.8,
      opacity: 0.6,
      zIndex: 10,
      filter: 'brightness(0.5) blur(2px)',
      rotateY: 30,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    right: {
      x: '45vw', // Push to screen edge
      scale: 0.8,
      opacity: 0.6,
      zIndex: 10,
      filter: 'brightness(0.5) blur(2px)',
      rotateY: -30,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  };

  // --- Sub-Component: The Realistic Frame ---
  const GalleryFrame = ({ artwork, isActive = false, onClick }: { artwork: any, isActive?: boolean, onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
      onClick={onClick}
      className={clsx(
        "relative bg-white transition-all duration-500",
        "w-[500px] h-[675px]", // Increased Dimensions (~1.35 aspect ratio)
        isActive ? "cursor-pointer" : ""
      )}>

      {/* 1. Wall Drop Shadow */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          boxShadow: isActive
            ? '0 30px 60px -10px rgba(0, 0, 0, 0.6), 0 15px 25px -5px rgba(0, 0, 0, 0.4)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
        }}
      />

      {/* 2. Black Aluminum Frame */}
      <div className="w-full h-full bg-[#111] p-[10px] flex ring-1 ring-white/10 ring-inset">

        {/* 3. The White Matting */}
        <div className="w-full h-full bg-[#fdfbf7] p-[45px] shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)] flex flex-col relative overflow-hidden">

          {/* 4. The Artwork - Full height of container minus matting */}
          <div className="relative w-full h-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)] bg-gray-200">
            <img
              src={artwork.imagePath}
              alt={artwork.title}
              className="w-full h-full object-cover block"
            />
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.15)] pointer-events-none" />

            {/* Click Hint Overlay (Only on Hover of Active) */}
            {isActive && (
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                <span className="bg-black/70 text-white px-4 py-2 rounded-full text-sm tracking-widest uppercase backdrop-blur-md">
                  View Details
                </span>
              </div>
            )}
          </div>

          {/* REMOVED: Label text to maximize space */}
        </div>
      </div>
    </div>
  );

  return (
    <Layout title="Magic Gallery" description="Where Art Meets Magic">
      {/* Whiter background, less grey */}
      <main
        className="relative w-full h-screen bg-[#fafafa] dark:bg-[#222] overflow-hidden flex flex-col items-center justify-center"
        onClick={() => setShowInfo(false)} // Close info if clicking background
      >

        {/* --- Background Atmosphere --- */}
        {/* Finer texture, lower opacity for subtle grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`
          }}
        />
        {/* Subtle, softer spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.03)_60%,_rgba(0,0,0,0.1)_100%)] pointer-events-none" />


        {/* REMOVED: Header */}


        {/* --- The Stage --- */}
        {/* Use vw/vh for full immersion */}
        <div className="relative w-full h-full flex items-center justify-center perspective-1500">

          {/* LAYER 1: The Carousel */}
          <div className="relative flex items-center justify-center">

            <AnimatePresence initial={false} mode='popLayout'>

              {/* LEFT */}
              <motion.div
                key={`left-${leftItem.id}`}
                className="absolute cursor-pointer"
                variants={cardVariants}
                initial="left" animate="left" exit="left"
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              >
                <GalleryFrame artwork={leftItem} />
              </motion.div>

              {/* RIGHT */}
              <motion.div
                key={`right-${rightItem.id}`}
                className="absolute cursor-pointer"
                variants={cardVariants}
                initial="right" animate="right" exit="right"
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
              >
                <GalleryFrame artwork={rightItem} />
              </motion.div>

              {/* CENTER */}
              <motion.div
                key={`center-${centerItem.id}`}
                className="absolute"
                variants={cardVariants}
                initial="center" animate="center"
              >
                <GalleryFrame
                  artwork={centerItem}
                  isActive={true}
                  onClick={(e) => { e.stopPropagation(); handleCenterClick(); }}
                />
              </motion.div>

            </AnimatePresence>
          </div>

          {/* LAYER 2: Yukari Overlay */}
          {/*
             Updated Width: 750px (to support 500px artwork width)
             500px / 750px = 0.666 (2/3)
          */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none w-[750px] flex justify-center items-center">

            {/* Character Image - STATIC INTENT, CLICKS PASS THROUGH */}
            <img
              src="/img/yukari.png"
              alt="Yukari Yakumo"
              className="w-full h-auto drop-shadow-2xl transition-transform"
              style={{
                filter: "drop-shadow(5px 15px 25px rgba(0,0,0,0.4))",
                transform: "translateY(10%)",
              }}
            />

            {/* INTERACTION HITBOX: Bottom Right 1/4 */}
            {/* This invisible box captures clicks for the explanation, allowing other clicks to pass through the rest of the image area. */}
            <div
              className="absolute bottom-[0%] right-[15%] w-[35%] h-[45%] cursor-help z-50 hover:bg-white/10 transition-colors rounded-full"
              style={{ pointerEvents: 'auto' }}
              onClick={toggleInfo}
              title="Click for Commentary"
            />

            {/* Info Pop-up (Speech Bubble Style) */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute top-[20%] right-[5%] w-[320px] bg-white/90 backdrop-blur-xl p-6 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-black/5"
                  style={{ pointerEvents: 'auto' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-4 border-b border-black/10 pb-2">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-black">{centerItem.title}</h3>
                      <p className="text-xs text-black/50 uppercase tracking-widest">{centerItem.subtitle}</p>
                    </div>
                    <button onClick={() => setShowInfo(false)} className="text-black/40 hover:text-black">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <p className="font-serif text-sm text-black/80 leading-relaxed italic">
                      {centerItem.description}
                    </p>
                    <div className="text-xs font-mono text-black/40 pt-2">
                      Artist: {centerItem.artist}
                    </div>
                  </div>

                  {/* Tail of speech bubble (CSS Triangle) */}
                  <div className="absolute top-[60%] -left-3 w-0 h-0 border-t-[10px] border-t-white/90 border-l-[10px] border-l-transparent border-b-[10px] border-b-transparent transform -rotate-90 drop-shadow-sm" />
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Navigation - Minimalist */}
        <div className="absolute bottom-8 flex gap-20 z-50">

          <button onClick={handlePrev} className="group p-4 transition-all">
            <ChevronLeft className="w-8 h-8 text-black/40 group-hover:text-black dark:text-white/40 dark:group-hover:text-white transition-colors" />
          </button>
          <button onClick={handleNext} className="group p-4 transition-all">
            <ChevronRight className="w-8 h-8 text-black/40 group-hover:text-black dark:text-white/40 dark:group-hover:text-white transition-colors" />
          </button>
        </div>

      </main>
    </Layout>
  );
}
