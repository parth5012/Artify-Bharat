import { motion } from 'framer-motion';
import { Shield, Search, Heart } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            id: 1,
            icon: <Search className="w-8 h-8" />,
            title: "Sourced with Care",
            description: "We personally visit artisan communities across India, building direct relationships and ensuring authentic traditional techniques are preserved.",
            color: "from-amber-500 to-orange-500"
        },
        {
            id: 2,
            icon: <Shield className="w-8 h-8" />,
            title: "Craft Authenticated",
            description: "Every product undergoes rigorous authenticity verification including artisan heritage validation, traditional technique confirmation, and material source documentation ensuring genuine handcrafted quality.",
            color: "from-emerald-500 to-teal-500"
        },
        {
            id: 3,
            icon: <Heart className="w-8 h-8" />,
            title: "Fair Wages, Lasting Impact",
            description: "75% of purchase price goes directly to artisans, supporting generational craft preservation and empowering entire communities sustainably.",
            color: "from-rose-500 to-pink-500"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-[#faf9f7] via-[#f5f2ed] to-[#ede8e0] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-[#8b4513] rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#d4784a] rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-artistic font-bold text-[#2c1b11] mb-6">
                        How Authenticity Works
                    </h2>
                    <p className="text-lg text-[#6d5a3d] max-w-3xl mx-auto font-friendly leading-relaxed">
                        From ancient workshops to your doorstep, every piece carries a verified story of tradition,
                        craftsmanship, and community empowerment.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="relative group"
                        >
                            {/* Card */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft hover:shadow-warm transition-all duration-500 border border-white/50 group-hover:scale-105">
                                {/* Step Number */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#8b4513] to-[#a0522d] rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-lg font-modern">{step.id}</span>
                                </div>

                                {/* Icon */}
                                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform duration-300`}>
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-artistic font-bold text-[#2c1b11] mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-[#6d5a3d] font-friendly leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Decorative Element */}
                                <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-[#d4af37]/20 to-[#c2794d]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Connection Line (except last item) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#8b4513] to-[#d4784a] opacity-30"></div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8b4513]/10 to-[#d4784a]/10 rounded-full border border-[#8b4513]/20">
                        <Shield className="w-5 h-5 text-[#8b4513]" />
                        <span className="text-[#8b4513] font-medium font-modern">100% Craft Authenticity Verified</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}