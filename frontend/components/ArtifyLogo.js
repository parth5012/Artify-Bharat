import React from 'react';

const ArtifyLogo = ({ size = 'md', showText = true, className = '', useImage = true }) => {
    const sizeClasses = {
        xs: {
            container: 'w-6 h-6',
            text: 'text-xs',
            tagline: 'text-[8px]',
            gap: 'gap-2'
        },
        sm: {
            container: 'w-8 h-8',
            text: 'text-sm',
            tagline: 'text-[9px]',
            gap: 'gap-2'
        },
        md: {
            container: 'w-12 h-12',
            text: 'text-lg',
            tagline: 'text-[10px]',
            gap: 'gap-3'
        },
        lg: {
            container: 'w-16 h-16',
            text: 'text-xl',
            tagline: 'text-xs',
            gap: 'gap-3'
        },
        xl: {
            container: 'w-20 h-20',
            text: 'text-2xl',
            tagline: 'text-sm',
            gap: 'gap-4'
        },
        '2xl': {
            container: 'w-24 h-24',
            text: 'text-3xl',
            tagline: 'text-base',
            gap: 'gap-4'
        },
        '3xl': {
            container: 'w-28 h-28',
            text: 'text-4xl',
            tagline: 'text-lg',
            gap: 'gap-5'
        },
        '4xl': {
            container: 'w-32 h-32',
            text: 'text-5xl',
            tagline: 'text-xl',
            gap: 'gap-6'
        }
    };

    const textSizes = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-lg',
        lg: 'text-xl',
        xl: 'text-2xl',
        '2xl': 'text-3xl',
        '3xl': 'text-4xl',
        '4xl': 'text-5xl'
    };

    // Use actual company logo image
    if (useImage) {
        return (
            <div className={`flex items-center ${sizeClasses[size].gap} ${className}`}>
                {/* Company Logo Image - Perfectly Adjusted */}
                <div className={`relative ${sizeClasses[size].container} group cursor-pointer flex-shrink-0`}>
                    <img
                        src="/images/company_logo.png"
                        alt="Artify Bharat Logo"
                        className={`${sizeClasses[size].container} object-contain object-center transition-all duration-500 group-hover:scale-105 drop-shadow-md rounded-full bg-white/10 backdrop-blur-sm border border-white/20`}
                        style={{
                            filter: 'drop-shadow(0 4px 8px rgba(139, 69, 19, 0.15))',
                            imageRendering: 'crisp-edges'
                        }}
                    />
                    {/* Enhanced glow effect */}
                    <div className={`absolute inset-0 ${sizeClasses[size].container} rounded-full bg-gradient-to-br from-[#8B4513]/15 via-[#D4AF37]/10 to-[#A0522D]/15 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm -z-10 scale-110`}></div>

                    {/* Subtle ring animation */}
                    <div className={`absolute inset-0 ${sizeClasses[size].container} rounded-full border border-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse`}></div>
                </div>

                {showText && (
                    <div className="flex flex-col justify-center min-w-0 flex-1">
                        <span className={`font-elegant font-black tracking-wide text-[#2C1B11] leading-tight ${textSizes[size]} 
              bg-gradient-to-r from-[#2C1B11] via-[#8B4513] to-[#2C1B11] bg-clip-text text-transparent
              drop-shadow-sm whitespace-nowrap`}>
                            ARTIFY <span className="text-[#8B4513] font-artistic">BHARAT</span>
                        </span>
                        {size !== 'xs' && size !== 'sm' && (
                            <span className={`font-handwritten text-[#8B4513]/70 tracking-[0.15em] uppercase leading-none ${sizeClasses[size].tagline} whitespace-nowrap overflow-hidden text-ellipsis`}>
                                Authentic Indian Art | Verified & Preserved
                            </span>
                        )}
                        {(size === 'xs' || size === 'sm') && (
                            <span className={`font-handwritten text-[#8B4513]/70 tracking-[0.1em] uppercase leading-none ${sizeClasses[size].tagline} whitespace-nowrap`}>
                                Authentic Crafts
                            </span>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // Fallback: Enhanced Wax Seal Variant (when useImage is false)
    return (
        <div className={`flex items-center ${sizeClasses[size].gap} ${className}`}>
            {/* Authentic Wax Seal Logo */}
            <div className={`relative ${sizeClasses[size].container} group cursor-pointer flex-shrink-0`}>
                {/* Outer wax seal ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#654321] shadow-lg border-2 border-[#D4AF37]/40 
          transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-6">
                    {/* Inner seal with decorative border */}
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#722F37] via-[#8B1538] to-[#4A0E2D] border border-dashed border-[#D4AF37]/50 flex items-center justify-center">
                        {/* AB monogram */}
                        <div className="relative">
                            <span className={`font-serif font-black text-[#D4AF37] tracking-tighter drop-shadow-sm ${size === 'xs' ? 'text-[8px]' :
                                size === 'sm' ? 'text-xs' :
                                    size === 'md' ? 'text-sm' :
                                        size === 'lg' ? 'text-base' :
                                            size === 'xl' ? 'text-lg' : 'text-xl'
                                }`}>
                                AB
                            </span>
                            {/* Hand symbol */}
                            <div className={`absolute -bottom-0.5 -right-0.5 text-[#D4AF37]/80 ${size === 'xs' ? 'text-[4px]' :
                                size === 'sm' ? 'text-[6px]' :
                                    size === 'md' ? 'text-[8px]' :
                                        size === 'lg' ? 'text-[10px]' :
                                            size === 'xl' ? 'text-xs' : 'text-sm'
                                }`}>
                                ✋
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative dots around seal */}
                <div className="absolute -inset-1 rounded-full border border-[#8B4513]/30 animate-spin-slow pointer-events-none opacity-60" />
            </div>

            {showText && (
                <div className="flex flex-col justify-center min-w-0 flex-1">
                    <span className={`font-elegant font-black tracking-wide text-[#2C1B11] leading-tight ${textSizes[size]} whitespace-nowrap`}>
                        ARTIFY <span className="text-[#8B4513] font-artistic">BHARAT</span>
                    </span>
                    {size !== 'xs' && size !== 'sm' && (
                        <span className={`font-handwritten text-[#8B4513]/70 tracking-[0.15em] uppercase leading-none ${sizeClasses[size].tagline} whitespace-nowrap overflow-hidden text-ellipsis`}>
                            Authentic Indian Art | Verified & Preserved
                        </span>
                    )}
                    {(size === 'xs' || size === 'sm') && (
                        <span className={`font-handwritten text-[#8B4513]/70 tracking-[0.1em] uppercase leading-none ${sizeClasses[size].tagline} whitespace-nowrap`}>
                            Authentic Crafts
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default ArtifyLogo;