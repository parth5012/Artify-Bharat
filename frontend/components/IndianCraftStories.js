import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_INDIAN_CRAFT_STORIES, CRAFT_EMOTIONS } from '../data/craftStories';
import StateImageGallery from './StateImageGallery';

// Use the complete collection of craft stories
const CRAFT_STORIES = ALL_INDIAN_CRAFT_STORIES;

export default function IndianCraftStories({ autoRotate = true, rotationInterval = 5000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoRotate);
    const [direction, setDirection] = useState(1);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [showGallery, setShowGallery] = useState(false);

    const currentStory = CRAFT_STORIES[currentIndex];

    // Auto-rotation effect
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % CRAFT_STORIES.length);
        }, rotationInterval);

        return () => clearInterval(interval);
    }, [isPlaying, rotationInterval]);

    const goToNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % CRAFT_STORIES.length);
    };

    const goToPrevious = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + CRAFT_STORIES.length) % CRAFT_STORIES.length);
    };

    const goToStory = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
            {/* Organic Background Shape */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F5F1E8] via-white to-[#FAF7F2] rounded-[3rem] shadow-2xl border border-[#8B4513]/10">
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#8B4513] rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-[#A0522D] to-[#722F37] rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-[#8B4513] to-[#654321] rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full opacity-15 animate-pulse" style={{ animationDelay: '3s' }}></div>

            {/* Floating Craft Elements */}
            <div className="absolute top-8 left-1/4 text-2xl opacity-10 animate-float">🏺</div>
            <div className="absolute top-16 right-1/3 text-xl opacity-15 animate-float" style={{ animationDelay: '1s' }}>🎨</div>
            <div className="absolute bottom-12 left-1/3 text-lg opacity-20 animate-float" style={{ animationDelay: '2s' }}>✋</div>
            <div className="absolute bottom-8 right-1/4 text-2xl opacity-10 animate-float" style={{ animationDelay: '3s' }}>🧵</div>

            {/* Header - More Organic */}
            <div className="relative bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#722F37] p-6 text-white rounded-t-[3rem]">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-2 font-elegant">🇮🇳 Craft Stories of India</h2>
                        <p className="text-white/90 font-friendly">Discover the rich heritage of Indian craftsmanship</p>
                        {currentStory.emotion && (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-sm text-white/70">Current Mood:</span>
                                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30 font-handwritten shadow-lg">
                                    {CRAFT_EMOTIONS[currentStory.emotion]?.name} • {currentStory.mood}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Play/Pause Button - More Artistic */}
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 border-2 border-white/30 shadow-xl"
                    >
                        <span className="text-2xl">{isPlaying ? '⏸️' : '▶️'}</span>
                    </button>
                </div>
            </div>
            {/* Main Story Display - More Organic */}
            <div
                className="relative h-96 overflow-hidden bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5F1E8] rounded-b-[2rem]"
                onTouchStart={(e) => {
                    setTouchStart(e.targetTouches[0].clientX);
                }}
                onTouchMove={(e) => {
                    setTouchEnd(e.targetTouches[0].clientX);
                }}
                onTouchEnd={() => {
                    if (!touchStart || !touchEnd) return;
                    const distance = touchStart - touchEnd;
                    const minSwipeDistance = 50;

                    if (distance > minSwipeDistance) {
                        goToNext();
                    } else if (distance < -minSwipeDistance) {
                        goToPrevious();
                    }
                }}
            >
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-b-[2rem] overflow-hidden"
                        style={{
                            background: currentStory.gradient
                        }}
                    >
                        {/* Organic Overlay Pattern */}
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                                  radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
                                backgroundSize: '50px 50px, 30px 30px'
                            }}>
                        </div>

                        <div className="h-full flex items-center justify-between p-8 text-white relative z-10">

                            {/* Left Side - Story Content with Organic Shape */}
                            <div className="flex-1 pr-8 relative">
                                {/* Decorative Background Shape */}
                                <div className="absolute -inset-4 bg-black/10 rounded-3xl blur-xl opacity-50"></div>

                                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="text-6xl drop-shadow-lg">{currentStory.icon}</div>
                                        <div>
                                            <h3 className="text-4xl font-bold font-elegant drop-shadow-md">{currentStory.state}</h3>
                                            <div className="flex items-center gap-3 mt-2">
                                                <p className="text-white/90 text-lg font-friendly">{currentStory.region}</p>
                                                {currentStory.emotion && (
                                                    <span className="px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-medium border border-white/40 font-handwritten shadow-lg">
                                                        {CRAFT_EMOTIONS[currentStory.emotion]?.name || currentStory.mood}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-lg leading-relaxed mb-6 text-white/95 font-friendly bg-black/10 rounded-xl p-4 backdrop-blur-sm">
                                        {currentStory.description}
                                    </p>

                                    {/* Craft Tags - More Organic */}
                                    <div className="flex flex-wrap gap-3 mb-6">
                                        {currentStory.crafts.map((craft, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30 hover:bg-white/30 transition-all duration-300 font-modern shadow-lg hover:scale-105"
                                                style={{
                                                    transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (index % 3)}deg)`
                                                }}
                                            >
                                                {craft}
                                            </span>
                                        ))}
                                    </div>

                                    {/* View Gallery Button - More Artistic */}
                                    {currentStory.image && (
                                        <button
                                            onClick={() => setShowGallery(true)}
                                            className="px-8 py-3 bg-white/25 backdrop-blur-sm rounded-full text-white font-medium border border-white/40 hover:bg-white/35 transition-all duration-300 hover:scale-105 flex items-center gap-3 font-modern shadow-xl"
                                        >
                                            <span className="text-xl">🖼️</span>
                                            <span>View Gallery</span>
                                            {currentStory.images && currentStory.images.length > 1 && (
                                                <span className="ml-2 px-3 py-1 bg-white/30 rounded-full text-xs font-bold">
                                                    {currentStory.images.length}
                                                </span>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Right Side - Product Image - More Artistic */}
                            <div className="flex-shrink-0 relative">
                                {/* Decorative Frame Elements */}
                                <div className="absolute -inset-6 bg-white/5 rounded-full blur-2xl"></div>
                                <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

                                {currentStory.image ? (
                                    <div className="relative group">
                                        {/* Organic Image Frame */}
                                        <div className="w-56 h-56 relative">
                                            {/* Multiple layered frames for depth */}
                                            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl border-2 border-white/40 shadow-2xl transform rotate-2 group-hover:rotate-1 transition-all duration-500"></div>
                                            <div className="absolute inset-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl transform -rotate-1 group-hover:rotate-0 transition-all duration-500"></div>

                                            {/* Main Image Container */}
                                            <div className="absolute inset-4 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-105 transition-all duration-500">
                                                <img
                                                    src={currentStory.image}
                                                    alt={`${currentStory.state} crafts`}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30" style={{ display: 'none' }}>
                                                    <span className="text-6xl opacity-80">{currentStory.icon}</span>
                                                </div>
                                            </div>

                                            {/* Artistic Overlay */}
                                            <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        </div>

                                        {/* Floating Craft Symbol */}
                                        <div className="absolute -top-2 -left-2 w-12 h-12 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 shadow-xl">
                                            <span className="text-xl">{currentStory.icon}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-56 h-56 relative group">
                                        <div className="absolute inset-0 bg-white/15 backdrop-blur-sm rounded-3xl border-2 border-white/30 shadow-2xl transform rotate-2 group-hover:rotate-1 transition-all duration-500"></div>
                                        <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                                            <span className="text-8xl opacity-80">{currentStory.icon}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Floating Decorative Elements - Emotion Based */}
                                {currentStory.emotion === 'ROYAL' && (
                                    <>
                                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-300/30 rounded-full animate-pulse"></div>
                                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400/40 rounded-full animate-bounce"></div>
                                        <div className="absolute top-1/4 -left-8 w-4 h-4 bg-purple-200/35 rounded-full animate-ping"></div>
                                    </>
                                )}
                                {currentStory.emotion === 'VIBRANT' && (
                                    <>
                                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-300/30 rounded-full animate-spin"></div>
                                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400/40 rounded-full animate-pulse"></div>
                                        <div className="absolute top-1/4 -left-8 w-4 h-4 bg-pink-200/35 rounded-full animate-bounce"></div>
                                    </>
                                )}
                                {currentStory.emotion === 'EARTHY' && (
                                    <>
                                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-300/30 rounded-full animate-pulse"></div>
                                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-amber-400/40 rounded-full animate-bounce"></div>
                                        <div className="absolute top-1/4 -left-8 w-4 h-4 bg-amber-200/35 rounded-full animate-ping"></div>
                                    </>
                                )}
                                {currentStory.emotion === 'SERENE' && (
                                    <>
                                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-300/30 rounded-full animate-pulse"></div>
                                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400/40 rounded-full animate-bounce"></div>
                                        <div className="absolute top-1/4 -left-8 w-4 h-4 bg-blue-200/35 rounded-full animate-ping"></div>
                                    </>
                                )}
                                {!currentStory.emotion && (
                                    <>
                                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/30 rounded-full animate-bounce"></div>
                                        <div className="absolute top-1/2 -left-8 w-4 h-4 bg-white/25 rounded-full animate-ping"></div>
                                    </>
                                )}

                                {/* Image Label */}
                                {currentStory.image && (
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                                        Authentic {currentStory.state} Craft
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows - More Artistic */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 border-2 border-white/30 shadow-xl group"
                >
                    <span className="text-2xl group-hover:-translate-x-0.5 transition-transform">‹</span>
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 border-2 border-white/30 shadow-xl group"
                >
                    <span className="text-2xl group-hover:translate-x-0.5 transition-transform">›</span>
                </button>
            </div>
            {/* Bottom Navigation - More Organic */}
            <div className="relative p-8 bg-gradient-to-br from-[#F8F6F3] via-white to-[#FAF7F2] rounded-b-[2rem]">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[#8B4513]/30 to-transparent rounded-full"></div>

                {/* Navigation Dots - More Artistic */}
                <div className="flex items-center justify-center gap-3 mb-6 flex-wrap max-h-20 overflow-y-auto">
                    {CRAFT_STORIES.map((story, index) => (
                        <button
                            key={story.id}
                            onClick={() => goToStory(index)}
                            className={`relative transition-all duration-300 shadow-lg hover:shadow-xl ${index === currentIndex
                                ? 'w-10 h-4 rounded-full scale-110'
                                : 'w-4 h-4 rounded-full hover:scale-125'
                                }`}
                            style={{
                                background: index === currentIndex
                                    ? story.gradient
                                    : 'linear-gradient(135deg, #d1d5db, #9ca3af)',
                                transform: `rotate(${index % 2 === 0 ? 2 : -2}deg)`
                            }}
                            title={story.state}
                        >
                            {index === currentIndex && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute inset-0 rounded-full border-2 border-white shadow-2xl"
                                />
                            )}
                            {/* Subtle glow effect */}
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#8B4513]/20 to-[#D4AF37]/20 blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    ))}
                </div>

                {/* Progress Bar - More Aesthetic */}
                {isPlaying && (
                    <div className="w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full h-2 overflow-hidden mb-6 shadow-inner">
                        <motion.div
                            className="h-full rounded-full shadow-sm"
                            style={{ background: currentStory.gradient }}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: rotationInterval / 1000, ease: "linear" }}
                            key={currentIndex}
                        />
                    </div>
                )}

                {/* Current State Info and Controls - More Artistic */}
                <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-[#8B4513]/10 shadow-lg">
                    <div className="text-sm text-[#6d5a3d]">
                        <p className="font-medium text-[#8B4513] text-lg font-elegant flex items-center gap-2">
                            <span className="text-xl">{currentStory.icon}</span>
                            {currentStory.state}
                        </p>
                        <p className="text-xs text-[#8B4513]/70 mt-1 font-friendly">
                            {currentStory.region}
                        </p>
                    </div>

                    {/* Quick Navigation - More Artistic */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setCurrentIndex(0)}
                            className="px-4 py-2 text-xs bg-gradient-to-r from-[#8B4513]/10 to-[#A0522D]/10 text-[#8B4513] rounded-full hover:from-[#8B4513]/20 hover:to-[#A0522D]/20 transition-all duration-300 font-modern border border-[#8B4513]/20 shadow-sm hover:shadow-md hover:scale-105"
                        >
                            ⏮️ First
                        </button>
                        <button
                            onClick={() => setCurrentIndex(CRAFT_STORIES.length - 1)}
                            className="px-4 py-2 text-xs bg-gradient-to-r from-[#722F37]/10 to-[#8B4513]/10 text-[#8B4513] rounded-full hover:from-[#722F37]/20 hover:to-[#8B4513]/20 transition-all duration-300 font-modern border border-[#8B4513]/20 shadow-sm hover:shadow-md hover:scale-105"
                        >
                            Last ⏭️
                        </button>
                        <button
                            onClick={() => setCurrentIndex(Math.floor(Math.random() * CRAFT_STORIES.length))}
                            className="px-4 py-2 text-xs bg-gradient-to-r from-[#D4AF37]/10 to-[#8B4513]/10 text-[#8B4513] rounded-full hover:from-[#D4AF37]/20 hover:to-[#8B4513]/20 transition-all duration-300 font-modern border border-[#8B4513]/20 shadow-sm hover:shadow-md hover:scale-105"
                        >
                            🎲 Random
                        </button>
                    </div>
                </div>
            </div>

            {/* State Image Gallery Modal */}
            <StateImageGallery
                state={currentStory.state}
                images={currentStory.images || (currentStory.image ? [currentStory.image] : [])}
                isOpen={showGallery}
                onClose={() => setShowGallery(false)}
            />
        </div>
    );
}