import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Heart, ShoppingCart, MapPin, Palette } from 'lucide-react';
import Link from 'next/link';
import AppLayout from '../../components/AppLayout';
import { getProductsList, getCategories } from '../../utils/apiCalls';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('title');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    loadData();
  }, [selectedCategory, sortBy, searchTerm, priceRange]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getProductsList(false, 1, null, {
          category: selectedCategory,
          ordering: sortBy,
          search: searchTerm,
          min_price: priceRange[0],
          max_price: priceRange[1]
        }),
        getCategories()
      ]);
      setProducts(productsData.results || productsData);
      setCategories(categoriesData.results || categoriesData);
    } catch (error) {
      console.error('Error loading marketplace data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  // Remove client-side filtering since we're doing it server-side now
  const filteredProducts = products;

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] via-white to-[#FAF7F2]">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#722F37] text-white py-16 px-6 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-8 text-4xl opacity-20 animate-float">🏺</div>
          <div className="absolute top-1/3 right-12 text-3xl opacity-15 animate-float" style={{ animationDelay: '2s' }}>🎨</div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-4 font-elegant"
            >
              Authentic Indian Crafts
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 font-friendly opacity-90"
            >
              Discover handmade treasures with verified authenticity
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto relative"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B4513] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for handmade crafts, artisans, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-white/20 bg-white/95 backdrop-blur-sm text-[#2C1B11] placeholder-[#8B4513]/60 focus:outline-none focus:border-[#D4AF37] transition-all duration-300 font-friendly"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filters & Controls */}
        <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-[#8B4513]/10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === ''
                  ? 'bg-[#8B4513] text-white shadow-lg'
                  : 'bg-[#8B4513]/10 text-[#8B4513] hover:bg-[#8B4513]/20'
                  }`}
              >
                All Crafts
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category.id
                    ? 'bg-[#8B4513] text-white shadow-lg'
                    : 'bg-[#8B4513]/10 text-[#8B4513] hover:bg-[#8B4513]/20'
                    }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border border-[#8B4513]/20 bg-white text-[#2C1B11] focus:outline-none focus:border-[#8B4513] font-friendly"
              >
                <option value="title">Name A-Z</option>
                <option value="-title">Name Z-A</option>
                <option value="unit_price">Price Low-High</option>
                <option value="-unit_price">Price High-Low</option>
                <option value="-last_update">Newest First</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-[#8B4513]/10 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-[#8B4513] text-white' : 'text-[#8B4513]'
                    }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-[#8B4513] text-white' : 'text-[#8B4513]'
                    }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-[#8B4513]/10 text-[#8B4513] rounded-xl hover:bg-[#8B4513]/20 transition-all duration-300"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="max-w-7xl mx-auto mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#8B4513]/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-[#2C1B11] mb-2 font-modern">
                      Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="flex-1 px-3 py-2 rounded-lg border border-[#8B4513]/20 focus:outline-none focus:border-[#8B4513] font-friendly"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                        className="flex-1 px-3 py-2 rounded-lg border border-[#8B4513]/20 focus:outline-none focus:border-[#8B4513] font-friendly"
                      />
                    </div>
                  </div>

                  {/* Additional filters can be added here */}
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setPriceRange([0, 10000]);
                        setSelectedCategory('');
                        setSearchTerm('');
                      }}
                      className="px-6 py-2 bg-[#8B4513]/10 text-[#8B4513] rounded-lg hover:bg-[#8B4513]/20 transition-all duration-300 font-modern"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Products Grid/List */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              layout
              className={viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
              }
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    isFavorite={favorites.has(product.id)}
                    onToggleFavorite={() => toggleFavorite(product.id)}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-[#2C1B11] mb-2 font-elegant">No crafts found</h3>
              <p className="text-[#8B4513]/70 font-friendly">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

function ProductCard({ product, viewMode, isFavorite, onToggleFavorite, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#8B4513]/10"
      >
        <div className="flex gap-6">
          {/* Image */}
          <div className="relative w-32 h-32 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10 rounded-xl"></div>
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.title}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover rounded-xl transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#8B4513]/20 to-[#A0522D]/20 rounded-xl flex items-center justify-center">
                <Palette className="w-8 h-8 text-[#8B4513]/50" />
              </div>
            )}

            {/* Favorite Button */}
            <button
              onClick={onToggleFavorite}
              className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <Link href={`/product/${product.id}`}>
                <h3 className="text-xl font-bold text-[#2C1B11] hover:text-[#8B4513] transition-colors cursor-pointer font-elegant">
                  {product.title}
                </h3>
              </Link>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#8B4513] font-modern">₹{product.unit_price}</div>
              </div>
            </div>

            {/* Artisan Info */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center">
                <span className="text-white text-xs">👤</span>
              </div>
              <span className="text-sm text-[#8B4513] font-friendly">
                by {product.artisan?.user?.first_name} {product.artisan?.user?.last_name}
              </span>
              {product.artisan?.user?.address && (
                <div className="flex items-center gap-1 text-xs text-[#8B4513]/70">
                  <MapPin className="w-3 h-3" />
                  {product.artisan.user.address.city}
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-[#2C1B11]/70 text-sm mb-4 line-clamp-2 font-friendly">
                {product.description}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link href={`/product/${product.id}`}>
                <button className="flex-1 px-4 py-2 bg-[#8B4513] text-white rounded-xl hover:bg-[#A0522D] transition-all duration-300 font-modern">
                  View Details
                </button>
              </Link>
              <button className="px-4 py-2 bg-[#8B4513]/10 text-[#8B4513] rounded-xl hover:bg-[#8B4513]/20 transition-all duration-300 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#8B4513]/10 hover:border-[#8B4513]/30"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10"></div>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#8B4513]/20 to-[#A0522D]/20 flex items-center justify-center">
            <Palette className="w-12 h-12 text-[#8B4513]/50" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>

        {/* Quick Actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Link href={`/product/${product.id}`} className="flex-1">
            <button className="w-full px-3 py-2 bg-white/95 backdrop-blur-sm text-[#8B4513] rounded-lg hover:bg-white transition-all duration-300 text-sm font-medium">
              View Details
            </button>
          </Link>
          <button className="px-3 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#A0522D] transition-all duration-300">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-[#2C1B11] hover:text-[#8B4513] transition-colors cursor-pointer mb-2 line-clamp-1 font-elegant">
            {product.title}
          </h3>
        </Link>

        {/* Artisan Info */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center">
            <span className="text-white text-xs">👤</span>
          </div>
          <span className="text-sm text-[#8B4513] font-friendly">
            {product.artisan?.user?.first_name} {product.artisan?.user?.last_name}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[#8B4513] font-modern">₹{product.unit_price}</div>
          {product.artisan?.user?.address && (
            <div className="flex items-center gap-1 text-xs text-[#8B4513]/70">
              <MapPin className="w-3 h-3" />
              {product.artisan.user.address.city}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}