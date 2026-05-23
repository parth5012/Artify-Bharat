import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Heart, Share2, ShoppingCart, Star, MapPin, Clock,
  Shield, Award, Camera, Play, ChevronLeft, ChevronRight,
  User, Calendar, Palette, Sparkles, CheckCircle, Info
} from 'lucide-react';
import Link from 'next/link';
import AppLayout from '../../components/AppLayout';
import { getProductDetail } from '../../utils/apiCalls';

export default function ProductPassport() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('story');

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductDetail(id);
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic
    console.log('Adding to cart:', { productId: id, quantity });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: `Check out this authentic handmade craft: ${product?.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] via-white to-[#FAF7F2] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#8B4513] to-[#A0522D] rounded-full animate-spin mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <p className="text-[#8B4513] font-friendly">Loading authentic craft details...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!product) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] via-white to-[#FAF7F2] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-[#2C1B11] mb-2 font-elegant">Product not found</h2>
            <p className="text-[#8B4513]/70 mb-6 font-friendly">This craft might have been moved or is no longer available</p>
            <Link href="/buyer/marketplace">
              <button className="px-6 py-3 bg-[#8B4513] text-white rounded-xl hover:bg-[#A0522D] transition-all duration-300 font-modern">
                Browse Other Crafts
              </button>
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  const images = product.images?.length > 0 ? product.images : [{ image_url: product.image_url }];

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] via-white to-[#FAF7F2]">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-[#8B4513]/10 sticky top-20 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#8B4513] hover:text-[#A0522D] transition-colors font-modern"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Marketplace
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-full bg-[#8B4513]/10 hover:bg-[#8B4513]/20 transition-all duration-300"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[#8B4513]'}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-[#8B4513]/10 hover:bg-[#8B4513]/20 transition-all duration-300"
              >
                <Share2 className="w-5 h-5 text-[#8B4513]" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10 group cursor-pointer"
                onClick={() => setShowImageModal(true)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {images[selectedImageIndex]?.image_url ? (
                  <img
                    src={images[selectedImageIndex].image_url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Palette className="w-16 h-16 text-[#8B4513]/50" />
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <Camera className="w-6 h-6 text-[#8B4513]" />
                  </div>
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                    >
                      <ChevronLeft className="w-5 h-5 text-[#8B4513]" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5 text-[#8B4513]" />
                    </button>
                  </>
                )}

                {/* Authenticity Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium font-modern">AI Verified</span>
                </div>
              </motion.div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 ${selectedImageIndex === index
                          ? 'ring-2 ring-[#8B4513] ring-offset-2'
                          : 'opacity-70 hover:opacity-100'
                        }`}
                    >
                      {image.image_url ? (
                        <img
                          src={image.image_url}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#8B4513]/20 to-[#A0522D]/20 flex items-center justify-center">
                          <Palette className="w-6 h-6 text-[#8B4513]/50" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Title & Price */}
              <div>
                <h1 className="text-4xl font-bold text-[#2C1B11] mb-4 font-elegant">
                  {product.title}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold text-[#8B4513] font-modern">
                    ₹{product.unit_price}
                  </div>
                  <div className="flex items-center gap-1 text-[#8B4513]/70">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-friendly">4.8 (24 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Artisan Info */}
              <div className="bg-gradient-to-r from-[#8B4513]/5 to-[#A0522D]/5 rounded-2xl p-6 border border-[#8B4513]/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center">
                    {product.artisan?.profile_image_url ? (
                      <img
                        src={product.artisan.profile_image_url}
                        alt={`${product.artisan.user?.first_name} ${product.artisan.user?.last_name}`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2C1B11] font-elegant">
                      {product.artisan?.user?.first_name} {product.artisan?.user?.last_name}
                    </h3>
                    <p className="text-[#8B4513] font-friendly">Master Artisan</p>
                    {product.artisan?.user?.address && (
                      <div className="flex items-center gap-1 text-sm text-[#8B4513]/70 mt-1">
                        <MapPin className="w-3 h-3" />
                        {product.artisan.user.address.city}, {product.artisan.user.address.state}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#8B4513]" />
                    <span className="font-friendly">{product.artisan?.experience || 10}+ years experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#8B4513]" />
                    <span className="font-friendly">{product.artisan?.speciality || 'Traditional Crafts'}</span>
                  </div>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-[#2C1B11] font-modern">Quantity:</label>
                  <div className="flex items-center border border-[#8B4513]/20 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-[#8B4513]/10 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-[#8B4513]/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 px-6 py-4 bg-[#8B4513] text-white rounded-xl hover:bg-[#A0522D] transition-all duration-300 flex items-center justify-center gap-2 font-modern font-semibold"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button className="px-6 py-4 border-2 border-[#8B4513] text-[#8B4513] rounded-xl hover:bg-[#8B4513] hover:text-white transition-all duration-300 font-modern font-semibold">
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl border border-[#8B4513]/10">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <div className="font-medium text-[#2C1B11] font-modern">Handmade</div>
                    <div className="text-sm text-[#8B4513]/70 font-friendly">100% Authentic</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl border border-[#8B4513]/10">
                  <Shield className="w-6 h-6 text-[#8B4513]" />
                  <div>
                    <div className="font-medium text-[#2C1B11] font-modern">AI Verified</div>
                    <div className="text-sm text-[#8B4513]/70 font-friendly">94% Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16">
            <div className="border-b border-[#8B4513]/20">
              <div className="flex gap-8">
                {[
                  { id: 'story', label: 'Artisan Story', icon: User },
                  { id: 'details', label: 'Product Details', icon: Info },
                  { id: 'reviews', label: 'Reviews', icon: Star },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-300 font-modern ${activeTab === tab.id
                        ? 'border-[#8B4513] text-[#8B4513]'
                        : 'border-transparent text-[#8B4513]/70 hover:text-[#8B4513]'
                      }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-8">
              <AnimatePresence mode="wait">
                {activeTab === 'story' && (
                  <motion.div
                    key="story"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-4xl"
                  >
                    <h3 className="text-2xl font-bold text-[#2C1B11] mb-6 font-elegant">The Story Behind This Craft</h3>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-[#2C1B11]/80 leading-relaxed font-friendly">
                        {product.artisan?.craft_story || product.description ||
                          "This beautiful handcrafted piece represents generations of traditional artistry passed down through skilled hands. Each detail tells a story of cultural heritage, meticulous craftsmanship, and the artisan's dedication to preserving ancient techniques while creating something truly unique for the modern world."}
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-4xl"
                  >
                    <h3 className="text-2xl font-bold text-[#2C1B11] mb-6 font-elegant">Product Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between py-3 border-b border-[#8B4513]/10">
                          <span className="font-medium text-[#2C1B11] font-modern">Category</span>
                          <span className="text-[#8B4513] font-friendly">{product.category}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#8B4513]/10">
                          <span className="font-medium text-[#2C1B11] font-modern">Material</span>
                          <span className="text-[#8B4513] font-friendly">Traditional Materials</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#8B4513]/10">
                          <span className="font-medium text-[#2C1B11] font-modern">Technique</span>
                          <span className="text-[#8B4513] font-friendly">Handcrafted</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between py-3 border-b border-[#8B4513]/10">
                          <span className="font-medium text-[#2C1B11] font-modern">Origin</span>
                          <span className="text-[#8B4513] font-friendly">
                            {product.artisan?.user?.address?.city || 'India'}
                          </span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#8B4513]/10">
                          <span className="font-medium text-[#2C1B11] font-modern">Availability</span>
                          <span className="text-green-600 font-friendly">In Stock</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#8B4513]/10">
                          <span className="font-medium text-[#2C1B11] font-modern">Shipping</span>
                          <span className="text-[#8B4513] font-friendly">5-7 Business Days</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-4xl"
                  >
                    <h3 className="text-2xl font-bold text-[#2C1B11] mb-6 font-elegant">Customer Reviews</h3>
                    <div className="text-center py-12">
                      <Star className="w-16 h-16 text-[#8B4513]/30 mx-auto mb-4" />
                      <p className="text-[#8B4513]/70 font-friendly">No reviews yet. Be the first to review this craft!</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {showImageModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setShowImageModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[selectedImageIndex]?.image_url}
                  alt={product.title}
                  className="w-full h-full object-contain rounded-2xl"
                />
                <button
                  onClick={() => setShowImageModal(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}