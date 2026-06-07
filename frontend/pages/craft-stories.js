import React from 'react';
import Link from 'next/link';
import ArtifyLogo from '../components/ArtifyLogo';
import IndianCraftStories from '../components/IndianCraftStories';
import CraftStatsDisplay from '../components/CraftStatsDisplay';
import Footer from '../components/Footer';

export default function CraftStoriesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] to-[#ede8e0]">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b6f47] via-[#c2794d] to-[#8b6f47] z-50"></div>

            <header className="fixed top-1 left-0 right-0 z-50 bg-[#f8f6f3]/98 backdrop-blur-md border-b-2 border-[#8b4513]/20">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <ArtifyLogo size="lg" showText={true} useImage={true} className="group-hover:scale-105 transition-transform duration-300" />
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/buyer/marketplace"
                                className="px-6 py-2.5 bg-gradient-to-r from-[#c2794d] to-[#8b6f47] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                            >
                                <span>🛍️</span>
                                <span>Explore Marketplace</span>
                            </Link>

                            <Link
                                href="/"
                                className="text-sm text-[#6d5a3d] hover:text-[#c2794d] transition-colors flex items-center space-x-2"
                            >
                                <span>←</span>
                                <span>Back to Home</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <div className="pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">

                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B4513]/10 text-[#8B4513] rounded-full text-sm font-bold tracking-widest uppercase mb-6">
                            <span>🇮🇳</span>
                            India's Cultural Heritage
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-[#3d3021] mb-6 font-serif">
                            Craft Stories of
                            <span className="bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#722F37] bg-clip-text text-transparent block">
                                Incredible India
                            </span>
                        </h1>

                        <p className="text-xl text-[#6d5a3d] max-w-3xl mx-auto leading-relaxed">
                            Embark on a journey through India's diverse states and discover the rich tapestry of traditional crafts.
                            Each region tells a unique story of artisanship, culture, and heritage that has been lovingly preserved
                            and passed down through countless generations.
                        </p>
                    </div>

                    {/* Interactive Craft Stories Component */}
                    <div className="mb-16">
                        <IndianCraftStories autoRotate={true} rotationInterval={8000} />
                    </div>

                    {/* Statistics Display */}
                    <div className="mb-16">
                        <CraftStatsDisplay />
                    </div>

                    {/* Additional Information */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#8B4513]/10">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#c2794d] to-[#8b6f47] rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                                🎨
                            </div>
                            <h3 className="text-2xl font-bold text-[#3d3021] mb-4">Rich Heritage</h3>
                            <p className="text-[#6d5a3d] leading-relaxed">
                                Each craft represents centuries of cultural evolution, with techniques and designs passed down through generations of skilled artisans.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#8B4513]/10">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#c2794d] to-[#8b6f47] rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                                🌍
                            </div>
                            <h3 className="text-2xl font-bold text-[#3d3021] mb-4">Regional Diversity</h3>
                            <p className="text-[#6d5a3d] leading-relaxed">
                                From Kashmir's Pashmina to Tamil Nadu's bronze sculptures, every state contributes unique artistic traditions to India's cultural mosaic.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#8B4513]/10">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#c2794d] to-[#8b6f47] rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                                ✋
                            </div>
                            <h3 className="text-2xl font-bold text-[#3d3021] mb-4">Handmade Excellence</h3>
                            <p className="text-[#6d5a3d] leading-relaxed">
                                Every piece is crafted by hand using traditional tools and techniques, ensuring authenticity and preserving ancient knowledge.
                            </p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#722F37] rounded-3xl p-12 text-white">
                        <h2 className="text-3xl font-bold mb-4">Support Indian Artisans</h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            When you purchase authentic Indian crafts, you're not just buying a product – you're supporting families,
                            preserving traditions, and keeping India's cultural heritage alive.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/buyer/marketplace"
                                className="px-8 py-4 bg-white text-[#8B4513] rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                            >
                                <span>🛍️</span>
                                Explore Authentic Crafts
                            </Link>

                            <Link
                                href="/artisan/onboard"
                                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold border-2 border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <span>🎨</span>
                                Join as Artisan
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Decoration */}
            <div className="h-2 bg-gradient-to-r from-[#8b6f47] via-[#c2794d] to-[#8b6f47]"></div>

            {/* Footer */}
            <Footer />
        </div>
    );
}