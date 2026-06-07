import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Star, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedMasterpieces({ products = [] }) {
    const [favorites, setFavorites] = useState(new Set());

    const toggleFavorite = (productId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(productId)) {
            newFavorites.delete(productId);
        } else {
            newFavorites.add(productId);
        }
        setFavorites(newFavorites);
    };

    // Fallback products if none provided
    const defaultProducts = [
        {
            id: 1,
            title: "Madhubani Peacock Art",
            artisanName: "Sita Devi",
            price: 2500,
            originalPrice: 3200,
            imageUrl: "/images/states/bihar.jpg",
            rating: 4.8,
            location: "Bihar",
            isVerified: true
        },
        {
            id: 2,
            title: "Kashmiri Pashmina Shawl",
            artisanName: "Mohammad Ali",
            price: 8500,
            originalPrice: 12000,
            imageUrl: "/images/states/kashmir.jpg",
            rating: 4.9,
            location: "Kashmir",
            isVerified: true
        },
        {
            id: 3,
            title: "Rajasthani Blue Pottery",
            artisanName: "Ramesh Kumhar",
            price: 1800,
            originalPrice: 2400,
            imageUrl: "/images/states/rajasthan.jpg",
            rating: 4.7,
            location: "Rajasthan",
            isVerified: true
        },
        {
            id: 4,
            title: "Kerala Kathakali Mask",
            artisanName: "Suresh Nair",
            price: 3200,
            originalPrice: 4000,
            imageUrl: "/images/states/kerala.webp",
            rating: 4.8,
            location: "Kerala",
            isVerified: true
        }
    ];

    const displayProducts = products.length > 0 ? products : defaultProducts;

    return (
        <section className="py-20 bg-gradient-to-br from-[#f8f6f3] via-[#faf8f5] to-[#f5f0e8] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#d4784a] rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-[#8b6f47] rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#d4af37]/20 to-[#c2794d]/20 rounded-full mb-6">
                        <Star className="w-4 h-4 text-[#d4af37]" />
                        <span className="text-[#8b4513] font-medium font-modern text-sm tracking-wide">CURATED COLLECTION</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-artistic font-bold text-[#2c1b11] mb-6">
                        Featured Masterpieces
                    </h2>
                    <p className="text-lg text-[#6d5a3d] max-w-2xl mx-auto font-friendly">
                        Handpicked treasures from master artisans, each piece telling a unique story of heritage and craftsmanship.
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group relative"
                        >
                            {/* Product Card */}
                            <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-warm transition-all duration-500 group-hover:scale-105">
                                {/* Image Container */}
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => toggleFavorite(product.id)}
                                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${favorites.has(product.id)
                                                    ? 'bg-red-500 text-white scale-110'
                                                    : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                                                }`}
                                        >
                                            <Heart className={`w-5 h-5 ${favorites.has(product.id) ? 'fill-current' : ''}`} />
                                        </button>

                                        <Link href={`/crafts/${product.id}`}>
                                            <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-[#8b4513] hover:text-white transition-all duration-300">
                                                <Eye className="w-5 h-5" />
                                            </button>
                                        </Link>
                                    </div>

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {product.isVerified && (
                                            <div className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                                VERIFIED
                                            </div>
                                        )}
                                        {product.originalPrice > product.price && (
                                            <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                                SALE
                                            </div>
                                        )}
                                    </div>

                                    {/* Rating */}
                                    <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                        <span className="text-white text-xs font-medium">{product.rating}</span>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-6">
                                    {/* Location */}
                                    <div className="flex items-center gap-1 mb-2">
                                        <MapPin className="w-3 h-3 text-[#8b6f47]" />
                                        <span className="text-xs text-[#8b6f47] font-medium">{product.location}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-artistic font-bold text-[#2c1b11] mb-2 line-clamp-2">
                                        {product.title}
                                    </h3>

                                    {/* Artisan */}
                                    <p className="text-sm text-[#6d5a3d] font-handwritten mb-4">
                                        by {product.artisanName}
                                    </p>

                                    {/* Price */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-[#8b4513] font-modern">
                                                ₹{product.price.toLocaleString()}
                                            </span>
                                            {product.originalPrice > product.price && (
                                                <span className="text-sm text-gray-500 line-through">
                                                    ₹{product.originalPrice.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quick View Button */}
                                    <Link href={`/crafts/${product.id}`}>
                                        <button className="w-full mt-4 py-3 bg-gradient-to-r from-[#8b4513] to-[#a0522d] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 font-modern">
                                            Quick View
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Link href="/buyer/marketplace">
                        <button className="px-8 py-4 bg-transparent border-2 border-[#8b4513] text-[#8b4513] rounded-xl font-semibold hover:bg-[#8b4513] hover:text-white transition-all duration-300 font-modern">
                            View All Masterpieces
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}