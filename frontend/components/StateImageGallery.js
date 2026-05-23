import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StateImageGallery({ state, images, isOpen, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!isOpen || !images || images.length === 0) return null;

    const goToNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#722F37] p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold">{state} Craft Gallery</h3>
                                <p className="text-white/90">Authentic handmade products</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                            >
                                <span className="text-xl">×</span>
                            </button>
                        </div>
                    </div>

                    {/* Image Display */}
                    <div className="relative h-96 bg-gray-100">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                                src={images[currentImageIndex]}
                                alt={`${state} craft ${currentImageIndex + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={goToPrevious}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
                                >
                                    <span className="text-2xl">‹</span>
                                </button>
                                <button
                                    onClick={goToNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
                                >
                                    <span className="text-2xl">›</span>
                                </button>
                            </>
                        )}

                        {/* Image Counter */}
                        {images.length > 1 && (
                            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm">
                                {currentImageIndex + 1} / {images.length}
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Strip */}
                    {images.length > 1 && (
                        <div className="p-4 bg-gray-50">
                            <div className="flex gap-2 overflow-x-auto">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                                                ? 'border-[#8B4513] ring-2 ring-[#8B4513]/30'
                                                : 'border-gray-300 hover:border-[#8B4513]/50'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}