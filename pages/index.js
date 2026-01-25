import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isVisible, setIsVisible] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('[id^="section-"]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const craftCategories = [
    { icon: '🏺', name: 'Pottery', count: '2.5K+' },
    { icon: '🧵', name: 'Weaving', count: '3.2K+' },
    { icon: '🗿', name: 'Carving', count: '1.8K+' },
    { icon: '💍', name: 'Jewellery', count: '4.1K+' },
  ]

  const features = [
    {
      icon: '✅',
      title: 'AI Authenticity Verification',
      description: '94% accuracy in detecting handmade vs machine-made products using advanced computer vision',
      color: 'primary',
    },
    {
      icon: '💰',
      title: 'Fair AI Pricing',
      description: 'ML-powered price recommendations ensuring artisans get fair compensation for their craftsmanship',
      color: 'terracotta',
    },
    {
      icon: '🌍',
      title: 'Multilingual Stories',
      description: 'Voice onboarding in native languages, AI-generated stories in 7+ languages for global reach',
      color: 'accent',
    },
  ]

  const stats = [
    { value: '10M+', label: 'Artisans Empowered', icon: '👥' },
    { value: '₹500Cr+', label: 'Revenue to Communities', icon: '💰' },
    { value: '50+', label: 'Craft Types Preserved', icon: '🎨' },
    { value: '150+', label: 'Countries Reached', icon: '🌍' }
  ]

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      <Head>
        <title>Artify Bharat - AI-Powered Verified Handmade Marketplace</title>
        <meta name="description" content="Empowering 10M+ Indian artisans to sell globally through AI-driven voice onboarding, multilingual storytelling, and authenticity verification." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section id="section-hero" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#f8f6f3]">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="#8b6f47" strokeWidth="2" />
              <circle cx="50" cy="50" r="30" stroke="#c2794d" strokeWidth="2" />
              <circle cx="50" cy="50" r="20" stroke="#8b6f47" strokeWidth="2" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/90 border-2 border-[#c2794d]/40 rounded-full shadow-soft mb-8">
                <span className="text-lg">✨</span>
                <span className="text-sm font-medium text-[#3d3021] font-hindi">प्रामाणिक हस्तनिर्मित उत्पाद</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#3d3021] mb-6 leading-tight font-display">
                Authentic Handmade,
                <br />
                <span className="text-[#c2794d]">AI Verified</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl sm:text-2xl text-[#6d5a3d] mb-12 leading-relaxed max-w-3xl mx-auto">
                Discover verified handmade products from{' '}
                <span className="font-semibold text-[#c2794d]">10M+ Indian artisans</span>.
                <br />Every piece tells a story, every purchase preserves tradition.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <Link
                  href="/buyer/marketplace"
                  className="group relative px-10 py-4 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-xl shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105 overflow-hidden border-2 border-[#c2794d]/30"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="text-xl">🛍️</span>
                    <span>Shop Authentic Products</span>
                  </span>
                </Link>

                <Link
                  href="/artisan/onboard"
                  className="px-10 py-4 bg-white text-[#3d3021] font-semibold rounded-xl border-2 border-earth-400/60 hover:border-[#c2794d] hover:bg-earth-50 transition-all duration-300 flex items-center space-x-2 shadow-soft hover:shadow-warm"
                >
                  <span className="text-xl">➕</span>
                  <span>Join as Artisan</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-[#6d5a3d]">
                {['Blockchain Verified', '94% AI Accuracy', 'Fair Trade Certified'].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f8f6f3] border-y-2 border-earth-300/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#3d3021] mb-3 font-display">
                Explore Craft Categories
              </h2>
              <p className="text-lg text-[#6d5a3d]">Traditional crafts from across India</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {craftCategories.map((category, index) => (
                <Link
                  key={index}
                  href="/buyer/marketplace"
                  className="group bg-white border-2 border-earth-400/40 rounded-2xl p-6 text-center hover:border-[#c2794d] hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#3d3021] mb-2">{category.name}</h3>
                  <p className="text-sm text-[#6d5a3d]">{category.count} products</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="section-features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8f6f3]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#3d3021] mb-4 font-display">
                Why Choose <span className="text-[#c2794d]">Artify Bharat</span>
              </h2>
              <p className="text-xl text-[#6d5a3d] max-w-3xl mx-auto">
                AI-powered platform ensuring authenticity, fair pricing, and global reach
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border-2 border-earth-300/50 p-8 text-center hover:border-[#c2794d] hover:shadow-warm transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-[#c2794d]/20 to-[#8b6f47]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-5xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#3d3021] mb-4 font-display">
                    {feature.title}
                  </h3>
                  <p className="text-[#6d5a3d] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-earth-900 via-earth-800 to-earth-900 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-3 font-display">
                Empowering <span className="text-[#c2794d]">Communities</span>
              </h2>
              <p className="text-lg text-earth-300">Real impact, real numbers, real change</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-[#c2794d] mb-2 font-display">
                    {stat.value}
                  </div>
                  <div className="text-sm lg:text-base text-earth-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8f6f3]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#3d3021] mb-4 font-display">
              Ready to Join the <span className="text-[#c2794d]">Movement</span>?
            </h2>
            <p className="text-xl text-[#6d5a3d] mb-10 leading-relaxed">
              Whether you're an artisan or a buyer seeking authentic handmade products,
              Artify Bharat is your gateway to preserving Indian craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/artisan/onboard"
                className="px-10 py-4 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-xl shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span className="text-xl">⚡</span>
                <span>Start Selling Your Crafts</span>
              </Link>
              <Link
                href="/buyer/marketplace"
                className="px-10 py-4 bg-white text-[#3d3021] font-semibold rounded-xl border-2 border-earth-400/60 hover:border-[#c2794d] hover:bg-earth-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-soft hover:shadow-warm"
              >
                <span className="text-xl">🔍</span>
                <span>Explore Marketplace</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}