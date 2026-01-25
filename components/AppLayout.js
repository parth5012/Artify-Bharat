import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function AppLayout({ children, currentPage }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      {/* Top Decorative Border */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b6f47] via-[#c2794d] to-[#8b6f47] z-50"></div>

      {/* App Header */}
      <header className="fixed top-1 left-0 right-0 z-40 bg-[#f8f6f3]/98 backdrop-blur-md border-b-2 border-[#d4c5b0]/40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-11 h-11 bg-gradient-to-br from-[#c2794d] to-[#8b6f47] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <span className="text-white font-bold text-xl">अ</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#3d3021] font-display">Artify Bharat</h1>
                <p className="text-xs text-[#8b6f47] font-hindi">कारीगरों का बाज़ार</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for handmade crafts..."
                  className="w-full px-4 py-2.5 pl-10 bg-white border-2 border-[#d4c5b0]/50 rounded-xl focus:outline-none focus:border-[#c2794d] transition-colors text-sm"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b6f47] text-lg">🔍</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="hidden md:flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
              <span>✓</span>
              <span>Verify Product</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-earth-100"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-earth-800 rounded transition-all ${sidebarOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-earth-800 rounded transition-all ${sidebarOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-earth-800 rounded transition-all ${sidebarOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-20">
        {/* Sidebar Navigation */}
        <Sidebar currentPage={currentPage} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          {children}
        </main>
      </div>
    </div>
  )
}

function Sidebar({ currentPage, sidebarOpen, setSidebarOpen }) {
  const navItems = [
    { id: 'onboarding', icon: '🎯', label: 'Voice Onboarding', href: '/artisan/onboard', badge: null },
    { id: 'marketplace', icon: '🛍️', label: 'Marketplace', href: '/buyer/marketplace', badge: null },
    { id: 'product', icon: '📜', label: 'Digital Passport', href: '/product/demo', badge: null },
    { id: 'orders', icon: '📦', label: 'Order Management', href: '/artisan/orders', badge: '3' },
    { id: 'dashboard', icon: '📊', label: 'Dashboard', href: '/artisan/dashboard', badge: null },
  ]

  return (
    <aside className={`fixed left-0 top-20 bottom-0 bg-white border-r-2 border-[#d4c5b0]/40 transition-all duration-300 z-30 ${
      sidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full md:translate-x-0'
    } overflow-hidden`}>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              currentPage === item.id
                ? 'bg-gradient-to-r from-[#c2794d]/10 to-[#8b6f47]/10 border-2 border-[#c2794d]/30 text-[#3d3021] font-semibold'
                : 'text-[#6d5a3d] hover:bg-[#f8f6f3] border-2 border-transparent'
            }`}
          >
            <span className="text-2xl flex-shrink-0">{item.icon}</span>
            {sidebarOpen && (
              <>
                <span className="flex-1 text-left text-sm">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-[#c2794d] text-white text-xs font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Link>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-[#d4c5b0]/40">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-[#6d5a3d] hover:bg-[#f8f6f3] rounded-xl transition-colors">
          <span className="text-2xl flex-shrink-0">👤</span>
          {sidebarOpen && <span className="text-sm font-medium">Profile</span>}
        </button>
      </div>

      {/* Collapse Toggle (Desktop) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="hidden md:block absolute -right-3 top-6 w-6 h-6 bg-white border-2 border-[#d4c5b0]/40 rounded-full hover:bg-[#f8f6f3] transition-colors"
      >
        <span className={`block transition-transform ${sidebarOpen ? 'rotate-0' : 'rotate-180'}`}>←</span>
      </button>
    </aside>
  )
}