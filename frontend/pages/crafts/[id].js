import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
    Heart,
    Share2,
    ShoppingCart,
    Star,
    MapPin,
    Ruler,
    Package,
    Shield,
    ChevronLeft,
    ChevronRight,
    Truck,
    RotateCcw
} from 'lucide-react';
import Link from 'next/link';
import AppLayout from '../../components/AppLayout';

export default function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;

    const [product, setProduct] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('details');
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);

    // Mock product data - replace with API call
    useEffect(() => {
        if (id) {
            // Simulate API call
            setTimeout(() => {
                setProduct({
                    id: id,
                    title: "Madhubani Peacock Painting",
                    artisan: {
                        id: 1,
                        name: "Sita Devi",
                        location: "Mithila, Bihar",
                        experience: 25,
                        rating: 4.9,
                        avatar: "/images/states/bihar.jpg",
                        bio: "Master artist specializing in traditional Madhubani paintings with over 25 years of experience.",
                        totalProducts: 47,
                        verified: true
                    },
                    price: 2500,
                    originalPrice: 3200,
                    discount: 22,
                    rating: 4.8,
                    reviewCount: 156,
                    images: [
                        "/images/states/bihar.jpg",
                        "/images/states/bihar.jpg",
                        "/images/states/bihar.jpg",
                        "/images/states/bihar.jpg"
                    ],
                    description: "This exquisite Madhubani painting features the sacred peacock, a symbol of grace and beauty in Indian culture. Hand-painted using traditional natural pigments on handmade paper, this artwork represents centuries-old techniques passed down through generations.",
                    specifications: {
                        dimensions: "16 x 12 inches",
                        material: "Natural pigments on handmade paper",
                        weight: "200 grams",
                        origin: "Mithila, Bihar",
                        technique: "Traditional Madhubani",
                        care: "Keep away from direct sunlight and moisture"
                    },
                    features: [
                        "100% Authentic Madhubani Art",
                        "Natural Pigments Used",
                        "Handmade Paper Canvas",
                        "Certificate of Authenticity",
                        "Ready to Frame"
                    ],
                    inStock: true,
                    stockCount: 3,
                    category: "Paintings",
                    tags: ["Traditional", "Madhubani", "Bihar", "Peacock", "Handpainted"]
                });
                setLoading(false);
            }, 1000);
        }
    }, [id]);

    const nextImage = () => {
        setSelectedImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const addToCart = () => {
        // Add to cart logic
        console.log('Added to cart:', { productId: id, quantity });
    };

    if (loading) {
        return (
            <AppLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#8b4513] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-[#6d5a3d] font-medium">Loading authentic craft...</p>
                    </div>
                </div>
            </AppLayout>
        );
    }

    if (!product) {
        return (
            <AppLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-[#2c1b11] mb-4">Product Not Found</h1>
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
                {/* Breadcrumb */}
                <div className="bg-white/50 backdrop-blur-sm border-b border-[#d4c5b0]/30">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-[#6d5a3d]">
                            <Link href="/" className="hover:text-[#8b4513] transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/buyer/marketplace" className="hover:text-[#8b4513] transition-colors">Marketplace</Link>
                            <span>/</span>
                            <span className="text-[#8b4513] font-medium">{product.title}</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Image Gallery */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Main Image */}
                            <div className="relative mb-6 group">
                                <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-soft">
                                    <img
                                        src={product.images[selectedImageIndex]}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Navigation Arrows */}
                                {product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </>
                                )}

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    <div className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                        <Shield className="w-3 h-3" />
                                        VERIFIED
                                    </div>
                                    {product.discount > 0 && (
                                        <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                            {product.discount}% OFF
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="grid grid-cols-4 gap-3">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImageIndex === index
                                                ? 'border-[#8b4513] ring-2 ring-[#8b4513]/30'
                                                : 'border-gray-200 hover:border-[#8b4513]/50'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.title} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Title & Rating */}
                            <div>
                                <h1 className="text-3xl md:text-4xl font-artistic font-bold text-[#2c1b11] mb-4">
                                    {product.title}
                                </h1>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(product.rating)
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-[#6d5a3d] font-medium ml-2">
                                            {product.rating} ({product.reviewCount} reviews)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="bg-gradient-to-r from-[#8b4513]/10 to-[#d4784a]/10 rounded-2xl p-6 border border-[#8b4513]/20">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-4xl font-bold text-[#8b4513] font-modern">
                                        ₹{product.price.toLocaleString()}
                                    </span>
                                    {product.originalPrice > product.price && (
                                        <span className="text-xl text-gray-500 line-through">
                                            ₹{product.originalPrice.toLocaleString()}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-[#6d5a3d]">
                                    Inclusive of all taxes • Free shipping above ₹2000
                                </p>
                            </div>

                            {/* Artisan Info */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                                <h3 className="text-lg font-artistic font-bold text-[#2c1b11] mb-4">
                                    Meet the Artisan
                                </h3>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={product.artisan.avatar}
                                        alt={product.artisan.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-[#8b4513]/20"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-[#2c1b11]">{product.artisan.name}</h4>
                                            {product.artisan.verified && (
                                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-[#6d5a3d] mb-2">
                                            <MapPin className="w-4 h-4" />
                                            <span>{product.artisan.location}</span>
                                        </div>
                                        <p className="text-sm text-[#6d5a3d]">
                                            {product.artisan.experience} years • {product.artisan.totalProducts} products
                                        </p>
                                    </div>
                                    <Link href={`/artisans/${product.artisan.id}`}>
                                        <button className="px-4 py-2 border border-[#8b4513] text-[#8b4513] rounded-lg hover:bg-[#8b4513] hover:text-white transition-colors text-sm font-medium">
                                            View Profile
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Quantity & Add to Cart */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <label className="text-[#2c1b11] font-medium">Quantity:</label>
                                    <div className="flex items-center border border-[#d4c5b0] rounded-lg">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-3 py-2 hover:bg-gray-50 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-2 border-x border-[#d4c5b0]">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="px-3 py-2 hover:bg-gray-50 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="text-sm text-[#6d5a3d]">
                                        Only {product.stockCount} left in stock
                                    </span>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={addToCart}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#8b4513] to-[#a0522d] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        className={`px-4 py-4 rounded-xl border-2 transition-all duration-300 ${isFavorite
                                                ? 'bg-red-500 border-red-500 text-white'
                                                : 'border-[#8b4513] text-[#8b4513] hover:bg-[#8b4513] hover:text-white'
                                            }`}
                                    >
                                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                                    </button>
                                    <button className="px-4 py-4 border-2 border-[#8b4513] text-[#8b4513] rounded-xl hover:bg-[#8b4513] hover:text-white transition-all duration-300">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Trust Indicators */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-white/50 rounded-xl">
                                    <Truck className="w-6 h-6 text-[#8b4513] mx-auto mb-2" />
                                    <p className="text-xs font-medium text-[#6d5a3d]">Free Shipping</p>
                                </div>
                                <div className="text-center p-4 bg-white/50 rounded-xl">
                                    <RotateCcw className="w-6 h-6 text-[#8b4513] mx-auto mb-2" />
                                    <p className="text-xs font-medium text-[#6d5a3d]">Easy Returns</p>
                                </div>
                                <div className="text-center p-4 bg-white/50 rounded-xl">
                                    <Shield className="w-6 h-6 text-[#8b4513] mx-auto mb-2" />
                                    <p className="text-xs font-medium text-[#6d5a3d]">Authenticity Guaranteed</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Tabs Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-16"
                    >
                        {/* Tab Navigation */}
                        <div className="flex border-b border-[#d4c5b0]/50 mb-8">
                            {[
                                { id: 'details', label: 'Product Details' },
                                { id: 'specifications', label: 'Specifications' },
                                { id: 'artisan', label: 'About Artisan' },
                                { id: 'reviews', label: 'Reviews' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-4 font-medium transition-all duration-300 ${activeTab === tab.id
                                            ? 'text-[#8b4513] border-b-2 border-[#8b4513]'
                                            : 'text-[#6d5a3d] hover:text-[#8b4513]'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50">
                            {activeTab === 'details' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-artistic font-bold text-[#2c1b11]">
                                        Product Description
                                    </h3>
                                    <p className="text-[#6d5a3d] leading-relaxed font-friendly">
                                        {product.description}
                                    </p>
                                    <div>
                                        <h4 className="text-lg font-bold text-[#2c1b11] mb-4">Key Features</h4>
                                        <ul className="space-y-2">
                                            {product.features.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2 text-[#6d5a3d]">
                                                    <div className="w-2 h-2 bg-[#8b4513] rounded-full"></div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'specifications' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-artistic font-bold text-[#2c1b11]">
                                        Specifications
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <div key={key} className="flex justify-between py-3 border-b border-[#d4c5b0]/30">
                                                <span className="font-medium text-[#2c1b11] capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                                                </span>
                                                <span className="text-[#6d5a3d]">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'artisan' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-artistic font-bold text-[#2c1b11]">
                                        About the Artisan
                                    </h3>
                                    <div className="flex items-start gap-6">
                                        <img
                                            src={product.artisan.avatar}
                                            alt={product.artisan.name}
                                            className="w-24 h-24 rounded-full object-cover border-4 border-[#8b4513]/20"
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-xl font-bold text-[#2c1b11] mb-2">
                                                {product.artisan.name}
                                            </h4>
                                            <div className="flex items-center gap-2 mb-4">
                                                <MapPin className="w-4 h-4 text-[#8b4513]" />
                                                <span className="text-[#6d5a3d]">{product.artisan.location}</span>
                                            </div>
                                            <p className="text-[#6d5a3d] leading-relaxed mb-4">
                                                {product.artisan.bio}
                                            </p>
                                            <div className="flex gap-6 text-sm">
                                                <div>
                                                    <span className="font-bold text-[#8b4513]">{product.artisan.experience}</span>
                                                    <span className="text-[#6d5a3d] ml-1">Years Experience</span>
                                                </div>
                                                <div>
                                                    <span className="font-bold text-[#8b4513]">{product.artisan.totalProducts}</span>
                                                    <span className="text-[#6d5a3d] ml-1">Products</span>
                                                </div>
                                                <div>
                                                    <span className="font-bold text-[#8b4513]">{product.artisan.rating}</span>
                                                    <span className="text-[#6d5a3d] ml-1">Rating</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-artistic font-bold text-[#2c1b11]">
                                        Customer Reviews
                                    </h3>
                                    <div className="text-center py-12 text-[#6d5a3d]">
                                        <p>Reviews section coming soon...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </AppLayout>
    );
}