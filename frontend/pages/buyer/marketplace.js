import AppLayout from '../../components/AppLayout'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getProductsList } from '@/utils/apiCalls'



export default function MarketplaceWeb() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 5000])

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      const data = await getProductsList()
      setProducts(data || []) // Fallback to empty array
      setLoading(false)
    }
    loadProducts()
  }, [])
  const categories = [
    { id: 'all', title: 'All', icon: '🎨' },
    { id: 'pottery', title: 'Pottery', icon: '🏺' },
    { id: 'weaving', title: 'Weaving', icon: '🧵' },
    { id: 'carving', title: 'Carving', icon: '🗿' },
    { id: 'jewellery', title: 'Jewellery', icon: '💍' },
    { id: 'textiles', title: 'Textiles', icon: '🧣' },
  ]

  // const products = [
  //   { id: 1, title: 'किसान पात्र', artisan: 'Kisan Patel', location: 'Gujarat, India', price: 720, rating: 4.5, image: '🏺', category: 'pottery' },
  //   { id: 2, title: 'Hand Woven Basket', artisan: 'Sunita Devi', location: 'Rajasthan', price: 540, rating: 5.0, image: '🧺', category: 'weaving' },
  //   { id: 3, title: 'Clay Diya Set', artisan: 'Ramesh Kumar', location: 'UP', price: 340, rating: 4.8, image: '🪔', category: 'pottery' },
  //   { id: 4, title: 'Wooden Carving', artisan: 'Amit Singh', location: 'MP', price: 890, rating: 4.7, image: '🗿', category: 'carving' },
  //   { id: 5, title: 'Silver Necklace', artisan: 'Priya Sharma', location: 'Jaipur', price: 1240, rating: 4.9, image: '📿', category: 'jewellery' },
  //   { id: 6, title: 'Handloom Saree', artisan: 'Lakshmi Bai', location: 'TN', price: 2100, rating: 5.0, image: '🧣', category: 'textiles' },
  // ]
  // const products = getProductsList();
  // console.log(products);


  const filteredProducts = products.filter(p =>
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    p.price >= priceRange[0] && p.price <= priceRange[1]
  )
  // console.log("Current Products in State:", products);
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
                className={`px-6 py-2 rounded-full transition-all duration-200 text-sm font-medium flex items-center space-x-2 ${selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white shadow-md'
                  : 'bg-white border-2 border-[#d4c5b0]/50 text-[#6d5a3d] hover:border-[#c2794d] hover:bg-[#f8f6f3]'
                  }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Product Grid - Full Width */}
            <div className="w-full">
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

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group bg-white rounded-2xl border-2 border-[#d4c5b0]/50 overflow-hidden hover:border-[#c2794d] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    {/* Product Image */}
                    <div className="relative h-56 bg-gradient-to-br from-[#f8f6f3] to-[#e8dfd0] overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-7xl">
                          🎨
                        </div>
                      )}
                      {/* Verified Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-lg border border-emerald-500/40 text-xs font-semibold text-emerald-700 flex items-center space-x-1.5 shadow-sm">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span>Verified</span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex flex-col flex-1">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-[#3d3021] mb-2 line-clamp-2 group-hover:text-[#c2794d] transition-colors">
                        {product.title}
                      </h3>

                      {/* Artisan & Category */}
                      <div className="flex items-center justify-between text-sm text-[#6d5a3d] mb-3">
                        <span className="line-clamp-1">{product.artisan || 'Artisan'}</span>
                        <span className="text-xs px-2 py-0.5 bg-[#f8f6f3] rounded-full">{product.category || 'Handmade'}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#6d5a3d] mb-3 line-clamp-2 flex-1">
                        {product.description || 'Handcrafted with love and traditional techniques'}
                      </p>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#d4c5b0]/40 mt-auto">
                        <div>
                          <div className="text-2xl font-bold text-[#c2794d]">₹{product.price}</div>
                          <div className="text-xs text-[#6d5a3d]">Free Shipping</div>
                        </div>
                        <button className="px-4 py-2 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all">
                          View
                        </button>
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
                      className={`w-10 h-10 rounded-lg font-semibold transition-colors ${page === 1
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