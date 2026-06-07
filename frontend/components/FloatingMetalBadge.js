import React from 'react';
import { motion } from 'framer-motion';

const FloatingMetalBadge = ({
    text = "VERIFIED",
    icon = "✓",
    position = "top-right",
    size = "md",
    className = ""
}) => {
    const positions = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4'
    };

    const sizes = {
        sm: { badge: 'px-2 py-1 text-xs', icon: 'text-xs' },
        md: { badge: 'px-3 py-1.5 text-sm', icon: 'text-sm' },
        lg: { badge: 'px-4 py-2 text-base', icon: 'text-base' }
    };

    return (
        <motion.div
            className={`absolute ${positions[position]} z-10 ${className}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Metal Badge */}
            <div className={`
        relative ${sizes[size].badge}
        bg-gradient-to-br from-[#E8E8E8] via-[#C0C0C0] to-[#A0A0A0]
        rounded-full shadow-lg border-2 border-[#B8860B]/50
        font-bold text-[#2C1B11] tracking-wider
        flex items-center gap-1.5
        transform transition-all duration-300
        hover:shadow-xl hover:border-[#FFD700]
      `}>

                {/* Rivets */}
                <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-full"></div>
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-full"></div>

                {/* Icon */}
                <span className={`${sizes[size].icon} text-[#15803d] font-black`}>
                    {icon}
                </span>

                {/* Text */}
                <span className="relative z-10">
                    {text}
                </span>

                {/* Shine Effect */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/30 to-[#FFD700]/30 
        rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </motion.div>
    );
};

export default FloatingMetalBadge;