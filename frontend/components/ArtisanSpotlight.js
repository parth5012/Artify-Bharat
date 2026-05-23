import { motion } from 'framer-motion';
import { MapPin, Award, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ArtisanSpotlight({ artisan }) {
    // Default artisan data if none provided
    const defaultArtisan = {
        id: 1,
        name: "Kamala Devi",
        craft: "Madhubani Painting",
        location: "Mithila, Bihar",
        experience: 35,
        portraitUrl: "/images/states/bihar.jpg",
        backgroundStory: "Born into a family of traditional Madhubani artists, Kamala has been painting since she was 8 years old. Her intricate depictions of Hindu deities and nature scenes have been exhibited in galleries across India and internationally.",
        achievements: ["National Award Winner 2019", "UNESCO Recognition", "Featured in Vogue India"],
        monthYear: "December 2024"
    };

    const displayArtisan = artisan || defaultArtisan;

    return (
        <section className="pt-20 pb-0 bg-gradient-to-br from-[#2c1b11] via-[#3d2a1a] to-[#2c1b11] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-craft.svg')] bg-repeat opacity-20"></div>
                <div className="absolute top-20 right-20 w-64 h-64 bg-[#d4af37] rounded-full blur-3xl opacity-20"></div>
                <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#c2794d] rounded-full blur-3xl opacity-20"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4af37]/20 to-[#c2794d]/20 rounded-full border border-[#d4af37]/30">
                        <Award className="w-4 h-4 text-[#d4af37]" />
                        <span className="text-[#d4af37] font-medium font-modern text-sm tracking-wide">ARTISAN OF THE MONTH</span>
                        <Calendar className="w-4 h-4 text-[#d4af37]" />
                        <span className="text-[#d4af37] font-medium font-modern text-sm">{displayArtisan.monthYear}</span>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Portrait & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Portrait Container */}
                        <div className="relative">
                            {/* Decorative Frame */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-[#d4af37] via-[#c2794d] to-[#8b6f47] rounded-3xl blur-lg opacity-30"></div>

                            {/* Main Portrait */}
                            <div className="relative bg-gradient-to-br from-[#d4af37]/20 to-[#c2794d]/20 rounded-3xl p-2 backdrop-blur-sm border border-[#d4af37]/30">
                                <img
                                    src={displayArtisan.portraitUrl}
                                    alt={displayArtisan.name}
                                    className="w-full aspect-[4/5] object-cover rounded-2xl shadow-2xl"
                                />

                                {/* Overlay Info Card */}
                                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin className="w-4 h-4 text-[#d4af37]" />
                                        <span className="text-white text-sm font-medium">{displayArtisan.location}</span>
                                    </div>
                                    <div className="text-[#d4af37] text-sm font-medium">
                                        {displayArtisan.experience} years of mastery
                                    </div>
                                </div>
                            </div>

                            {/* Floating Achievement Badges */}
                            <div className="absolute -top-6 -right-6 space-y-2">
                                {displayArtisan.achievements.slice(0, 2).map((achievement, index) => (
                                    <div
                                        key={index}
                                        className="px-3 py-2 bg-gradient-to-r from-[#d4af37] to-[#c2794d] text-white text-xs font-bold rounded-full shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300"
                                    >
                                        {achievement}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Story & Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Header */}
                        <div>
                            <h2 className="text-5xl md:text-6xl font-artistic font-bold text-white mb-4">
                                Meet the Master
                            </h2>
                            <div className="h-1 w-24 bg-gradient-to-r from-[#d4af37] to-[#c2794d] rounded-full"></div>
                        </div>

                        {/* Artisan Details */}
                        <div className="space-y-4">
                            <h3 className="text-3xl font-artistic font-bold text-[#d4af37]">
                                {displayArtisan.name}
                            </h3>
                            <div className="flex items-center gap-3">
                                <div className="px-4 py-2 bg-gradient-to-r from-[#8b6f47]/30 to-[#a0522d]/30 rounded-full border border-[#d4af37]/30">
                                    <span className="text-[#d4af37] font-medium font-modern">
                                        {displayArtisan.craft} Specialist
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Story */}
                        <div className="space-y-4">
                            <p className="text-lg text-gray-300 font-friendly leading-relaxed">
                                {displayArtisan.backgroundStory}
                            </p>
                        </div>

                        {/* Achievements Grid */}
                        <div className="grid grid-cols-1 gap-3">
                            {displayArtisan.achievements.map((achievement, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                                >
                                    <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
                                    <span className="text-gray-300 font-medium">{achievement}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Link href={`/artisans/${displayArtisan.id}`}>
                                <button className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#c2794d] text-black rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 font-modern">
                                    <span>Read Full Story</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Decorative Element */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#d4af37] font-modern">500+</div>
                            <div className="text-xs text-gray-400 font-medium">Master Artisans</div>
                        </div>
                        <div className="w-px h-8 bg-white/20"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#d4af37] font-modern">28</div>
                            <div className="text-xs text-gray-400 font-medium">Indian States</div>
                        </div>
                        <div className="w-px h-8 bg-white/20"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#d4af37] font-modern">50+</div>
                            <div className="text-xs text-gray-400 font-medium">Craft Forms</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}