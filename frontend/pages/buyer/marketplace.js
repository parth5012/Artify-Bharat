import AppLayout from '../../components/AppLayout'
import { useState } from 'react'
import Link from 'next/link'

export default function MarketplaceWeb() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 5000])

  const categories = [
    { id: 'all', name: 'All', icon: '🎨' },
    { id: 'pottery', name: 'Pottery', icon: '🏺' },
    { id: 'weaving', name: 'Weaving', icon: '🧵' },
    { id: 'carving', name: 'Carving', icon: '🗿' },
    { id: 'jewellery', name: 'Jewellery', icon: '💍' },
    { id: 'textiles', name: 'Textiles', icon: '🧣' },
  ]
  
  const products = [
    { id: 1, name: 'किसान पात्र', artisan: 'Kisan Patel', location: 'Gujarat, India', price: 720, rating: 4.5, image: '🏺', category: 'pottery' },
    { id: 2, name: 'Hand Woven Basket', artisan: 'Sunita Devi', location: 'Rajasthan', price: 540, rating: 5.0, image: '🧺', category: 'weaving' },
    { id: 3, name: 'Clay Diya Set', artisan: 'Ramesh Kumar', location: 'UP', price: 340, rating: 4.8, image: '🪔', category: 'pottery' },
    { id: 4, name: 'Wooden Carving', artisan: 'Amit Singh', location: 'MP', price: 890, rating: 4.7, image: '🗿', category: 'carving' },
    { id: 5, name: 'Silver Necklace', artisan: 'Priya Sharma', location: 'Jaipur', price: 1240, rating: 4.9, image: '📿', category: 'jewellery' },
    { id: 6, name: 'Handloom Saree', artisan: 'Lakshmi Bai', location: 'TN', price: 2100, rating: 5.0, image: '🧣', category: 'textiles' },
    { id: 7, name: 'Brass Lamp', artisan: 'Suresh Rao', location: 'Karnataka', price: 670, rating: 4.6, image: '🪔', category: 'carving' },
    { id: 8, name: 'Embroidered Cushion', artisan: 'Meera Das', location: 'Kashmir', price: 450, rating: 4.8, image: '🎨', category: 'textiles' },
  ]

  const filteredProducts = products.filter(p => 
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    p.price >= priceRange[0] && p.price <= priceRange[1]
  )

  return (
    <AppLayout currentPage="marketplace">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#3d3021] mb-2 font-display">Marketplace</h2>
            <p className="text-[#6d5a3d]">Discover authentic handmade crafts from Indian artisans</p>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full transition-all duration-200 text-sm font-medium flex items-center space-x-2 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white shadow-md'
                    : 'bg-white border-2 border-[#d4c5b0]/50 text-[#6d5a3d] hover:border-[#c2794d] hover:bg-[#f8f6f3]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left: Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 shadow-sm sticky top-28">
                <h3 className="text-lg font-bold text-[#3d3021] mb-4 font-display">Filters</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#3d3021] mb-2">
                      Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-[#c2794d]" 
                    />
                    <div className="flex justify-between text-xs text-[#6d5a3d] mt-1">
                      <span>₹0</span>
                      <span>₹5000+</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#3d3021] mb-2">Region</label>
                    <select className="w-full px-3 py-2 bg-[#f8f6f3] border-2 border-[#d4c5b0]/50 rounded-lg text-sm focus:outline-none focus:border-[#c2794d]">
                      <option>All Regions</option>
                      <option>Gujarat</option>
                      <option>Rajasthan</option>
                      <option>Tamil Nadu</option>
                      <option>Karnataka</option>
                      <option>Uttar Pradesh</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#3d3021] mb-3">Verification</label>
                    <label className="flex items-center space-x-2 mb-2 cursor-pointer">
                      <input type="checkbox" className="rounded accent-[#c2794d]" defaultChecked />
                      <span className="text-sm text-[#6d5a3d]">AI Verified</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded accent-[#c2794d]" defaultChecked />
                      <span className="text-sm text-[#6d5a3d]">100% Handmade</span>
                    </label>
                  </div>

                  <button className="w-full py-2 text-sm text-[#c2794d] font-medium hover:underline">
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Product Grid */}
            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <p className="text-[#6d5a3d]">
                  <span className="font-semibold text-[#3d3021]">{filteredProducts.length}</span> products found
                </p>
                <select className="px-4 py-2 bg-white border-2 border-[#d4c5b0]/50 rounded-lg text-sm focus:outline-none focus:border-[#c2794d]">
                  <option>Most Relevant</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Top Rated</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group bg-white rounded-2xl border-2 border-[#d4c5b0]/50 overflow-hidden hover:border-[#c2794d] hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-[#f8f6f3] to-[#e8dfd0] flex items-center justify-center">
                      <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                        {product.image}
                      </div>
                      <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 rounded-lg border border-[#c2794d]/40 text-xs font-semibold text-[#3d3021] flex items-center space-x-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        <span>Verified</span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-[#3d3021] mb-2 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-[#6d5a3d] mb-3">
                        <span className="line-clamp-1">{product.artisan}</span>
                        <span>•</span>
                        <span className="line-clamp-1">{product.location}</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-amber-500' : 'text-[#d4c5b0]'}`}>★</span>
                          ))}
                          <span className="text-xs text-[#6d5a3d] ml-1">{product.rating}</span>
                        </div>
                        <span className="text-xl font-bold text-[#c2794d]">₹{product.price}</span>
                      </div>

                      <div className="pt-3 border-t border-[#d4c5b0]/40">
                        <p className="text-xs text-[#6d5a3d] italic line-clamp-2">
                          Handcrafted with traditional techniques passed through generations...
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-white border-2 border-[#d4c5b0]/50 text-[#6d5a3d] font-medium rounded-lg hover:border-[#c2794d] transition-colors">
                    Previous
                  </button>
                  {[1, 2, 3].map(page => (
                    <button 
                      key={page}
                      className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                        page === 1 
                          ? 'bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white'
                          : 'bg-white border-2 border-[#d4c5b0]/50 text-[#6d5a3d] hover:border-[#c2794d]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-4 py-2 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-lg shadow-sm">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}