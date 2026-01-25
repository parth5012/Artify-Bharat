import AppLayout from '../../components/AppLayout'

export default function ArtisanDashboard() {
  const stats = [
    { label: 'Total Products', value: '127', change: '+12', icon: '📦', color: 'from-blue-500 to-blue-600' },
    { label: 'Total Sales', value: '₹45.2K', change: '+18%', icon: '💰', color: 'from-emerald-500 to-emerald-600' },
    { label: 'Active Orders', value: '24', change: '+3', icon: '🚀', color: 'from-amber-500 to-amber-600' },
    { label: 'AI Verified', value: '98%', change: '+2%', icon: '✓', color: 'from-[#c2794d] to-[#8b6f47]' },
  ]

  const recentProducts = [
    { name: 'Terracotta Vase', views: 234, sales: 12, status: 'active', image: '🏺' },
    { name: 'Clay Diya Set', views: 189, sales: 8, status: 'active', image: '🪔' },
    { name: 'Handloom Basket', views: 156, sales: 6, status: 'pending', image: '🧺' },
  ]

  return (
    <AppLayout currentPage="dashboard">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#3d3021] mb-2 font-display">Welcome back, Kisan! 👋</h2>
            <p className="text-[#6d5a3d]">Here's what's happening with your artisan store today</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-4 md:p-6 shadow-sm hover:shadow-warm transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-xl md:text-2xl shadow-md`}>
                    {stat.icon}
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-[#3d3021] mb-1 font-display">{stat.value}</div>
                <div className="text-xs md:text-sm text-[#6d5a3d]">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Products */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#3d3021] font-display">Recent Products</h3>
                  <button className="text-sm text-[#c2794d] font-semibold hover:underline">View All</button>
                </div>

                <div className="space-y-4">
                  {recentProducts.map((product, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#f8f6f3] rounded-xl border border-[#d4c5b0]/30 hover:border-[#c2794d] transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border-2 border-[#d4c5b0]/50 text-2xl">
                          {product.image}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#3d3021]">{product.name}</h4>
                          <div className="flex items-center space-x-3 text-xs text-[#6d5a3d] mt-1">
                            <span>👁️ {product.views} views</span>
                            <span>•</span>
                            <span>💰 {product.sales} sales</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'active' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gradient-to-br from-[#c2794d] to-[#8b6f47] rounded-2xl p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold mb-4 font-display">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition-colors text-left px-4">
                    ➕ Add New Product
                  </button>
                  <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition-colors text-left px-4">
                    📊 View Analytics
                  </button>
                  <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition-colors text-left px-4">
                    💬 Customer Messages
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-[#d4c5b0]/50 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#3d3021] mb-4 font-display">AI Insights</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800">🎯 Pottery items are trending this week</p>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-emerald-800">💡 Consider adding more clay diyas</p>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-800">📸 Update product photos for better visibility</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}