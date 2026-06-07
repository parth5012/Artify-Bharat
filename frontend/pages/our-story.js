import { motion } from 'framer-motion';
import ArtifyLogo from '../components/ArtifyLogo';
import Footer from '../components/Footer';

export default function OurStory() {
    return (
        <>
            <div className="bg-gradient-to-br from-[#faf9f7] via-[#f5f2ed] to-[#ede8e0]">
                <div className="max-w-4xl mx-auto px-6 pt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <div className="flex justify-center mb-6">
                            <ArtifyLogo size="xl" showText={true} useImage={true} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-artistic font-bold text-[#2c1b11] mb-6">
                            Our Story
                        </h1>
                        <p className="text-lg text-[#6d5a3d] font-friendly">
                            Preserving India's rich craft heritage, one artisan at a time
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-white/50"
                    >
                        <div className="prose prose-lg max-w-none">
                            <p className="text-[#6d5a3d] font-friendly leading-relaxed mb-6">
                                Artify Bharat was born from a simple yet powerful vision: to create a bridge between India's
                                master artisans and the world, ensuring that centuries-old traditions continue to thrive in
                                the modern era.
                            </p>

                            <p className="text-[#6d5a3d] font-friendly leading-relaxed mb-6">
                                Founded in the historic city of Panipat, Haryana - known for its rich weaving heritage -
                                we understand the challenges faced by traditional craftspeople in today's digital marketplace.
                                Our platform provides authentic verification, fair pricing, and direct market access to
                                artisans across India.
                            </p>

                            <p className="text-[#6d5a3d] font-friendly leading-relaxed mb-0">
                                Every product on our platform tells a story of heritage, skill, and cultural preservation.
                                We're not just a marketplace - we're custodians of India's living traditions.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer - No Gap */}
            <Footer />
        </>
    );
}