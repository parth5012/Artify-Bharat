// SOLUTION: Replace the marketplace hero section with this cleaner version
// This removes the duplicate search and creates a unified search experience

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Award } from 'lucide-react';

export default function MarketplaceHero({ searchTerm, setSearchTerm, onFilterToggle }) {
    return (
        <div className="relative bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#722F37] text-white py-12 px-6 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-8 left-8 text-6xl opacity-30">🏺</div>
                <div className="absolute top-16 right-16 text-4xl opacity-20">🎨</div>
                <div className="absolute bottom-8 left-1/4 text-5xl opacity-25">✨</div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Breadcrumb & Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-2 text-sm mb-4 opacity-80">
                        <span>Home</span>
                        <span>/</span>
                        <span className="text-[#D4AF37]">Marketplace</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-artistic font-bold mb-2">
                        Authentic Crafts Marketplace
                    </h1>
                    <p className="text-lg opacity-90 font-friendly">
                        Discover verified handmade treasures from master artisans across India
                    </p>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-6 mb-8"
                >
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                        <Award className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-medium">500+ Verified Artisans</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                        <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-medium">2000+ Authentic Products</span>
                    </div>
                </motion.div>

                {/* Quick Filter Buttons - Replace the search bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-3"
                >
                    <button
                        onClick={onFilterToggle}
                        className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/30 transition-all duration-300 font-medium"
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filters & Search</span>
                    </button>

                    {['Pottery', 'Textiles', 'Jewelry', 'Paintings'].map((category) => (
                        <button
                            key={category}
                            className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 text-sm font-medium"
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

// Enhanced AppLayout Search Bar (Keep this in header, make it more prominent)
export function EnhancedHeaderSearch({ searchTerm, setSearchTerm, placeholder = "Search crafts, artisans..." }) {
    return (
        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative group">
                {/* Enhanced search container */}
                <div className="relative bg-white/90 backdrop-blur-xl border-2 border-white/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-focus-within:border-[#d4af37]/60 group-focus-within:shadow-2xl">
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-6 py-4 pl-14 pr-20 bg-transparent rounded-2xl focus:outline-none text-[#3d3021] placeholder-[#8b6f47]/60 font-modern text-base"
                    />

                    {/* Enhanced search icon */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#c2794d] rounded-full flex items-center justify-center shadow-md group-focus-within:scale-110 transition-transform duration-300">
                            <Search className="w-4 h-4 text-white" />
                        </div>
                    </div>

                    {/* Search button */}
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-[#8b4513] to-[#a0522d] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium text-sm">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}

// Usage Instructions:
// 1. Replace the AppLayout search bar with EnhancedHeaderSearch
// 2. Replace the marketplace hero section with MarketplaceHero
// 3. This eliminates the duplicate search while maintaining functionality
// 4. The header search becomes the primary search interface
// 5. The hero section focuses on navigation and quick filters