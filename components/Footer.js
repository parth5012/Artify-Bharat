import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-earth-900 via-earth-800 to-earth-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-t-4 border-[#c2794d]/60">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#c2794d] to-[#8b6f47] rounded-xl flex items-center justify-center shadow-warm">
                                <span className="text-white font-bold text-xl font-hindi">अ</span>
                            </div>
                            <div>
                                <span className="text-2xl font-bold font-display">Artify Bharat</span>
                                <p className="text-sm text-earth-400 font-hindi">कारीगरों का बाज़ार</p>
                            </div>
                        </div>
                        <p className="text-earth-400 mb-6 max-w-md leading-relaxed">
                            Empowering artisans through AI-powered marketplace for authentic handmade products.
                            Preserving culture, creating opportunities.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-earth-700 rounded-lg flex items-center justify-center hover:bg-[#c2794d] transition-colors">
                                <span className="text-lg">📘</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-earth-700 rounded-lg flex items-center justify-center hover:bg-[#c2794d] transition-colors">
                                <span className="text-lg">📷</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-earth-700 rounded-lg flex items-center justify-center hover:bg-[#c2794d] transition-colors">
                                <span className="text-lg">🐦</span>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg mb-4 text-[#c2794d] font-display">For Artisans</h4>
                        <ul className="space-y-2 text-earth-400 text-sm">
                            <li><Link href="/artisan/onboard" className="hover:text-white transition-colors">Join Platform</Link></li>
                            <li><Link href="/artisan/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                            <li><Link href="/artisan/orders" className="hover:text-white transition-colors">Manage Orders</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Support Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg mb-4 text-[#c2794d] font-display">For Buyers</h4>
                        <ul className="space-y-2 text-earth-400 text-sm">
                            <li><Link href="/buyer/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Categories</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Authenticity</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Help & FAQ</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-earth-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-earth-400 text-sm text-center md:text-left">
                            © 2024 Artify Bharat. All rights reserved. Made with ❤️ for Indian artisans.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <Link href="#" className="text-earth-400 hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="#" className="text-earth-400 hover:text-white transition-colors">Terms of Service</Link>
                            <Link href="#" className="text-earth-400 hover:text-white transition-colors">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}