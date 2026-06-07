import React from 'react';
import { motion } from 'framer-motion';

const SwaggyLoader = ({ size = 'md', message = 'Loading...' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20'
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            {/* Rotating Metal Plate */}
            <motion.div
                className={`relative ${sizeClasses[size]}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
                {/* Metal Plate Base */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#E8E8E8] via-[#C0C0C0] to-[#A0A0A0] 
          rounded-lg shadow-lg border-2 border-[#B8860B]/40">

                    {/* Corner Rivets */}
                    <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-full"></div>
                    <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-full"></div>
                    <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-full"></div>
                    <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-full"></div>

                    {/* Center Wax Seal */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#654321]">
                        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#722F37] via-[#8B1538] to-[#4A0E2D] flex items-center justify-center">
                            <span className="font-serif font-black text-[#D4AF37] text-xs">AB</span>
                        </div>
                    </div>
                </div>

                {/* Spinning Glow */}
                <motion.div
                    className="absolute -inset-2 rounded-full border-2 border-dashed border-[#D4AF37]/50"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>

            {/* Loading Text */}
            <motion.div
                className="text-[#8B4513] font-medium text-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                {message}
            </motion.div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
                        animate={{
                            x: [0, 20, -20, 0],
                            y: [0, -20, 20, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                        style={{
                            left: `${30 + i * 20}%`,
                            top: `${40 + i * 10}%`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default SwaggyLoader;