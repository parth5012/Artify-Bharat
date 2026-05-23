import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
    MapPin,
    Star,
    Award,
    Calendar,
    Heart,
    Eye,
    Filter,
    Grid,
    List,
    Share2,
    MessageCircle,
    Phone
} from 'lucide-react';
import Link from 'next/link';
import AppLayout from '../../components/AppLayout';

export default function ArtisanProfile() {
    const router = useRouter();
    const { id } = router.query;

    const [artisan, setArtisan] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [favorites, setFavorites] = useState(new Set());

    // Mock data - replace with API calls
    useEffect(() => {
        if (id) {
            setTimeout(() => {
                setArtisan({
                    id: id,
                    name: "Sita Devi",
                    craft: "Madhubani Painting",
                    location: "Mithila, Bihar",
                    state: "Bihar",
                    experience: 25,
                    rating: 4.9,
                    totalReviews: 234,
                    totalProducts: 47,
                    totalSales: 1250,
                    joinedDate: "2019-03-15",
                    avatar: "/images/states/bihar.jpg",
                    coverImage: "/images/states/bihar.jpg",
                    bio: "Master artisan Sita Devi has been practicing the ancient art of Madhubani painting for over 25 years. Born and raised in the cultural heartland of Mithila, she learned this sacred art form from her grandmother and has since become one of the most respected practitioners in her community. Her work has been featured in galleries across India and internationally, earning her numerous awards and recognition.",
                    story: "Growing up in a small village in Mithila, Sita was surrounded by the vibrant colors and intricate patterns of Madhubani art from childhood. What started as helping her grandmother prepare natural pigments has evolved into a lifelong passion and mastery of this UNESCO-recognized art form.",
                    specializations: ["Traditional Madhubani", "Contemporary Fusion", "Natural Pigments", "Large Canvas Works"],
                    achievements: [
                        "National Award for Excellence in Handicrafts (2020)",
                        "UNESCO Intangible Cultural Heritage Recognition",
                        "Featured in Vogue India (2021)",
                        "Bihar State Award for Traditional Arts (2019)"
                    ],
                    verified: true,
                    responseTime: "Usually responds within 2 hours",
                    languages: ["Hindi", "Maithili", "English"]
                });

                setProducts([
                    {
                        id: 1,
                        title: "Madhubani Peacock Art",
                        price: 2500,
                        originalPrice: 3200,
                        imageUrl: "/images/states/bihar.jpg",
                        rating: 4.8,
                        category: "Traditional",
                        inStock: true,
                        featured: true
                    },
                    {
                        id: 2,
                        title: "Ganesha Madhubani Painting",
                        price: 3500,
                        originalPrice: 4000,
                        imageUrl: "/images/states/bihar.jpg",
                        rating: 4.9,
                        category: "Religious",
                        inStock: true,
                        featured: false
                    },
                    {
                        id: 3,
                        title: "Tree of Life Madhubani",
                        price: 4200,
                        originalPrice: 5000,
                        imageUrl: "/images/states/bihar.jpg",
                        rating: 4.7,
                        category: "Contemporary",
                        inStock: false,
                        featured: true
                    },
                    {
                        id: 4,
                        title: "Fish Motif Traditional Art",
                        price: 1800,
                        originalPrice: 2200,
                        imageUrl: "/images/states/bihar.jpg",
                        rating: 4.6,
                        category: "Traditional",
                        inStock: true,
                        featured: false
                    }
                ]);

                setLoading(false);
            }, 1000);
        }
    }, [id]);

    const toggleFavorite = (productId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(productId)) {
            newFavorites.delete(productId);
        } else {
            newFavorites.add(productId);
        }
        setFavorites(newFavorites);
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category.toLowerCase() === selectedCategory);

    if (loading) {
        return (
            <AppLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#8b4513] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-[#6d5a3d] font-medium">Loading artisan profile...</p>
                    </div>
                </div>
            </AppLayout>
        );
    }

    if (!artisan) {
        return (
            <AppLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-[#2c1b11] mb-4">Artisan Not Found</h1>
                        <Link href="/buyer/marketplace">
                            <button className="px-6 py-3 bg-[#8b4513] text-white rounded-lg hover:bg-[#a0522d] transition-colors">
                                Back to Marketplace
                            </button>
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-[#f5f2ed] to-[#ede8e0]">
                {/* Cover Section */}
                <div className="relative h-80 overflow-hidden">
                    <img
                        src={artisan.coverImage}
                        alt={`${artisan.name} workshop`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

                    {/* Breadcrumb */}
                    <div className="absolute top-6 left-6 flex items-center gap-2 text-sm text-white/80">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/buyer/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
                        <span>/</span>
                        <span className="text-white">Artisans</span>
                        <span>/</span>
                        <span className="text-white font-medium">{artisan.name}</span>
                    </div>

                    {/* Share Button */}
                    <button className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Profile Header */}
                <div className="relative -mt-20 z-10">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
                            <div className="flex flex-col lg:flex-row gap-8 items-start">
                                {/* Avatar & Basic Info */}
                                <div className="flex flex-col items-center lg:items-start">
                                    <div className="relative mb-6">
                                        <img
                                            src={artisan.avatar}
                                            alt={artisan.name}
                                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                                        />
                                        {artisan.verified && (
                                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
                                                <div className="w-4 h-4 bg-white rounded-full"></div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-center lg:text-left">
                                        <h1 className="text-3xl font-artistic font-bold text-[#2c1b11] mb-2">
                                            {artisan.name}
                                        </h1>
                                        <p className="text-lg text-[#8b4513] font-medium mb-2">
                                            {artisan.craft} Specialist
                                        </p>
                                        <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                                            <MapPin className="w-4 h-4 text-[#6d5a3d]" />
                                            <span className="text-[#6d5a3d]">{artisan.location}</span>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(artisan.rating)
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[#6d5a3d] font-medium">
                                                {artisan.rating} ({artisan.totalReviews} reviews)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats & Info */}
                                <div className="flex-1 grid md:grid-cols-3 gap-6">
                                    <div className="text-center p-4 bg-gradient-to-br from-[#8b4513]/10 to-[#d4784a]/10 rounded-2xl">
                                        <div className="text-2xl font-bold text-[#8b4513] font-modern mb-1">
                                            {artisan.experience}
                                        </div>
                                        <div className="text-sm text-[#6d5a3d] font-medium">Years Experience</div>
                                    </div>

                                    <div className="text-center p-4 bg-gradient-to-br from-[#d4af37]/10 to-[#c2794d]/10 rounded-2xl">
                                        <div className="text-2xl font-bold text-[#8b4513] font-modern mb-1">
                                            {artisan.totalProducts}
                                        </div>
                                        <div className="text-sm text-[#6d5a3d] font-medium">Products Created</div>
                                    </div>

                                    <div className="text-center p-4 bg-gradient-to-br from-[#c2794d]/10 to-[#8b6f47]/10 rounded-2xl">
                                        <div className="text-2xl font-bold text-[#8b4513] font-modern mb-1">
                                            {artisan.totalSales}
                                        </div>
                                        <div className="text-sm text-[#6d5a3d] font-medium">Happy Customers</div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-3">
                                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8b4513] to-[#a0522d] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                                        <MessageCircle className="w-5 h-5" />
                                        Contact Artisan
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-3 border-2 border-[#8b4513] text-[#8b4513] rounded-xl font-semibold hover:bg-[#8b4513] hover:text-white transition-all duration-300">
                                        <Phone className="w-5 h-5" />
                                        Call Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Left Column - About & Story */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* About Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50"
                            >
                                <h2 className="text-2xl font-artistic font-bold text-[#2c1b11] mb-4">
                                    About {artisan.name}
                                </h2>
                                <p className="text-[#6d5a3d] leading-relaxed font-friendly mb-6">
                                    {artisan.bio}
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="w-4 h-4 text-[#8b4513]" />
                                        <span className="text-[#6d5a3d]">
                                            Member since {new Date(artisan.joinedDate).getFullYear()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <MessageCircle className="w-4 h-4 text-[#8b4513]" />
                                        <span className="text-[#6d5a3d]">{artisan.responseTime}</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Specializations */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50"
                            >
                                <h3 className="text-xl font-artistic font-bold text-[#2c1b11] mb-4">
                                    Specializations
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {artisan.specializations.map((spec, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gradient-to-r from-[#8b4513]/20 to-[#d4784a]/20 text-[#8b4513] rounded-full text-sm font-medium"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Achievements */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50"
                            >
                                <h3 className="text-xl font-artistic font-bold text-[#2c1b11] mb-4 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-[#d4af37]" />
                                    Achievements
                                </h3>
                                <div className="space-y-3">
                                    {artisan.achievements.map((achievement, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-[#d4af37]/10 to-[#c2794d]/10 rounded-xl">
                                            <div className="w-2 h-2 bg-[#d4af37] rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-[#6d5a3d] text-sm leading-relaxed">{achievement}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column - Products */}
                        <div className="lg:col-span-2">
                            {/* Products Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
                            >
                                <div>
                                    <h2 className="text-3xl font-artistic font-bold text-[#2c1b11] mb-2">
                                        Artisan's Collection
                                    </h2>
                                    <p className="text-[#6d5a3d]">
                                        {filteredProducts.length} handcrafted pieces
                                    </p>
                                </div>

                                {/* Filters & View Toggle */}
                                <div className="flex items-center gap-4">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="px-4 py-2 border border-[#d4c5b0] rounded-lg focus:outline-none focus:border-[#8b4513] bg-white"
                                    >
                                        <option value="all">All Categories</option>
                                        <option value="traditional">Traditional</option>
                                        <option value="contemporary">Contemporary</option>
                                        <option value="religious">Religious</option>
                                    </select>

                                    <div className="flex border border-[#d4c5b0] rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 ${viewMode === 'grid' ? 'bg-[#8b4513] text-white' : 'text-[#6d5a3d] hover:bg-gray-50'}`}
                                        >
                                            <Grid className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 ${viewMode === 'list' ? 'bg-[#8b4513] text-white' : 'text-[#6d5a3d] hover:bg-gray-50'}`}
                                        >
                                            <List className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Products Grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className={`grid gap-6 ${viewMode === 'grid'
                                        ? 'md:grid-cols-2 lg:grid-cols-2'
                                        : 'grid-cols-1'
                                    }`}
                            >
                                {filteredProducts.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className={`group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-warm transition-all duration-500 hover:scale-105 ${viewMode === 'list' ? 'flex gap-6' : ''
                                            }`}
                                    >
                                        {/* Product Image */}
                                        <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'
                                            }`}>
                                            <img
                                                src={product.imageUrl}
                                                alt={product.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />

                                            {/* Overlay Actions */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => toggleFavorite(product.id)}
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${favorites.has(product.id)
                                                            ? 'bg-red-500 text-white'
                                                            : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                                                        }`}
                                                >
                                                    <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-current' : ''}`} />
                                                </button>

                                                <Link href={`/crafts/${product.id}`}>
                                                    <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-[#8b4513] hover:text-white transition-all duration-300">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </Link>
                                            </div>

                                            {/* Badges */}
                                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                                                {product.featured && (
                                                    <div className="px-2 py-1 bg-[#d4af37] text-white text-xs font-bold rounded-full">
                                                        FEATURED
                                                    </div>
                                                )}
                                                {!product.inStock && (
                                                    <div className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                                        SOLD OUT
                                                    </div>
                                                )}
                                                {product.originalPrice > product.price && (
                                                    <div className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                                        SALE
                                                    </div>
                                                )}
                                            </div>

                                            {/* Rating */}
                                            <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full flex items-center gap-1">
                                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                <span className="text-white text-xs font-medium">{product.rating}</span>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                            <h3 className="text-lg font-artistic font-bold text-[#2c1b11] mb-2 line-clamp-2">
                                                {product.title}
                                            </h3>

                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-xl font-bold text-[#8b4513] font-modern">
                                                    ₹{product.price.toLocaleString()}
                                                </span>
                                                {product.originalPrice > product.price && (
                                                    <span className="text-sm text-gray-500 line-through">
                                                        ₹{product.originalPrice.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>

                                            <Link href={`/crafts/${product.id}`}>
                                                <button className="w-full py-3 bg-gradient-to-r from-[#8b4513] to-[#a0522d] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 font-modern">
                                                    View Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Load More */}
                            {filteredProducts.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="text-center mt-12"
                                >
                                    <button className="px-8 py-4 border-2 border-[#8b4513] text-[#8b4513] rounded-xl font-semibold hover:bg-[#8b4513] hover:text-white transition-all duration-300">
                                        Load More Products
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}