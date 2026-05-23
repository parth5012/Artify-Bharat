/**
 * ARTIFY BHARAT - HOMEPAGE COMPONENT
 * 
 * This is the main landing page for the Artify Bharat platform.
 * Features:
 * - Interactive hero section with parallax animations
 * - Floating craft image gallery
 * - Indian craft stories showcase
 * - Featured products and artisan spotlight
 * - Responsive design with mobile-first approach
 * 
 * Key Technologies:
 * - Next.js for React framework
 * - Framer Motion for animations
 * - Tailwind CSS for styling
 * - Lucide React for icons
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Sparkles, MoveDown, Compass } from "lucide-react";
import Link from 'next/link';

// Component imports
import ArtifyLogo from '../components/ArtifyLogo';
import IndianCraftStories from '../components/IndianCraftStories';
import LogoFavicon from '../components/LogoFavicon';
import HowItWorks from '../components/HowItWorks';
import FeaturedMasterpieces from '../components/FeaturedMasterpieces';
import ArtisanSpotlight from '../components/ArtisanSpotlight';
import Footer from '../components/Footer';

// Data imports
import { getFeaturedProducts } from '../data/mockData';

export default function Home() {
  // Ref for scroll-based animations
  const containerRef = useRef(null);

  // SCROLL-BASED ANIMATIONS
  // Track scroll progress for dynamic animations throughout the page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animation transforms based on scroll position
  const stampRotate = useTransform(scrollYProgress, [0, 0.5], [0, 360]);
  const stampY = useTransform(scrollYProgress, [0, 0.4], [0, 180]);
  const stampScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.75]);

  // Parallax effects for hero section
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const canvasPatternScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);

  return (
    <>
      <LogoFavicon />
      <div
        ref={containerRef}
        className="relative bg-[#F5F1E8] text-[#2C1B11] overflow-x-hidden font-friendly selection:bg-[#8B4513] selection:text-white"
      >
        {/* Dynamic Hand-woven Background Canvas Texture */}
        <motion.div
          style={{ scale: canvasPatternScale }}
          className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(#8B4513_1.5px,transparent_1.5px)] [background-size:24px_24px]"
        />

        {/* --- PREMIUM NAVBAR --- */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#F5F1E8]/70 border-b border-[#2C1B11]/5 px-8 py-4 flex justify-between items-center">
          <div className="hidden sm:block">
            <ArtifyLogo size="md" showText={true} useImage={true} />
          </div>
          <div className="block sm:hidden">
            <ArtifyLogo size="sm" showText={false} useImage={true} />
          </div>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wide text-[#2C1B11]/80 font-modern">
            <Link href="/buyer/marketplace" className="hover:text-[#8B4513] transition-colors">
              Explore Crafts
            </Link>
            <a href="#artisans" className="hover:text-[#8B4513] transition-colors">
              Meet Artisans
            </a>
            <a href="#stories" className="hover:text-[#8B4513] transition-colors">
              Our Story
            </a>
          </nav>

          <Link href="/login/login">
            <button className="relative group overflow-hidden px-5 py-2.5 rounded-full border border-[#8C3B1A] text-sm font-semibold tracking-wider uppercase transition-all duration-300">
              <span className="absolute inset-0 w-full h-full bg-[#8C3B1A] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative text-[#8C3B1A] group-hover:text-[#F4EFEA] flex items-center gap-2">
                <Compass className="w-4 h-4 animate-spin-slow" />
                Discover Authentic
              </span>
            </button>
          </Link>
        </header>

        {/* --- HERO SECTION --- */}
        <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 text-center overflow-hidden">

          {/* Constant Blurred Craft Images Background - Higher Opacity like Screenshot */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Main craft images - increased opacity to match screenshot */}
            <div className="absolute top-20 left-[8%] w-32 h-32 opacity-[0.25] blur-[2px] rotate-12">
              <img src="/images/img_1ab.jpg" alt="" className="w-full h-full object-cover rounded-2xl" />
            </div>

            <div className="absolute top-32 right-[12%] w-28 h-28 opacity-[0.22] blur-[3px] -rotate-6">
              <img src="/images/img2_ab.avif" alt="" className="w-full h-full object-cover rounded-2xl" />
            </div>

            <div className="absolute bottom-40 left-[15%] w-24 h-24 opacity-[0.24] blur-[2.5px] rotate-8">
              <img src="/images/img3_ab.jpg" alt="" className="w-full h-full object-cover rounded-2xl" />
            </div>

            <div className="absolute bottom-32 right-[10%] w-30 h-30 opacity-[0.20] blur-[3px] -rotate-12">
              <img src="/images/img4_ab.jpg" alt="" className="w-full h-full object-cover rounded-2xl" />
            </div>

            {/* Additional state craft images - higher opacity */}
            <div className="absolute top-1/3 left-[5%] w-16 h-16 opacity-[0.18] blur-[4px] rotate-45">
              <img src="/images/states/kashmir.jpg" alt="" className="w-full h-full object-cover rounded-xl" />
            </div>

            <div className="absolute top-1/2 right-[6%] w-20 h-20 opacity-[0.16] blur-[4px] -rotate-30">
              <img src="/images/states/rajasthan.jpg" alt="" className="w-full h-full object-cover rounded-xl" />
            </div>

            <div className="absolute bottom-1/3 left-[3%] w-14 h-14 opacity-[0.19] blur-[3px] rotate-60">
              <img src="/images/states/kerala.webp" alt="" className="w-full h-full object-cover rounded-xl" />
            </div>

            <div className="absolute top-1/4 right-[3%] w-12 h-12 opacity-[0.15] blur-[5px] -rotate-45">
              <img src="/images/states/gujrat.webp" alt="" className="w-full h-full object-cover rounded-xl" />
            </div>

            {/* Micro craft elements for texture - increased opacity */}
            <div className="absolute top-[15%] left-[25%] w-8 h-8 opacity-[0.12] blur-[6px] rotate-90">
              <img src="/images/states/bihar.jpg" alt="" className="w-full h-full object-cover rounded-lg" />
            </div>

            <div className="absolute bottom-[20%] right-[25%] w-10 h-10 opacity-[0.14] blur-[5px] -rotate-75">
              <img src="/images/states/tamilnadu.jpg" alt="" className="w-full h-full object-cover rounded-lg" />
            </div>

            {/* Additional constant background elements - higher opacity */}
            <div className="absolute top-[60%] left-[40%] w-6 h-6 opacity-[0.10] blur-[7px] rotate-30">
              <img src="/images/states/punjab2.jpg" alt="" className="w-full h-full object-cover rounded-lg" />
            </div>

            <div className="absolute top-[25%] left-[70%] w-18 h-18 opacity-[0.17] blur-[4px] -rotate-20">
              <img src="/images/states/maharstra.png" alt="" className="w-full h-full object-cover rounded-xl" />
            </div>

            <div className="absolute bottom-[60%] right-[40%] w-12 h-12 opacity-[0.16] blur-[5px] rotate-50">
              <img src="/images/states/west bengal.jpg" alt="" className="w-full h-full object-cover rounded-lg" />
            </div>

            <div className="absolute top-[45%] left-[20%] w-14 h-14 opacity-[0.13] blur-[6px] -rotate-60">
              <img src="/images/states/uttarpradesh.jpg" alt="" className="w-full h-full object-cover rounded-xl" />
            </div>

            {/* Subtle gradient overlay to maintain readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F5F1E8]/40 via-[#F5F1E8]/20 to-[#F5F1E8]/40" />
          </div>
          {/* COMPANY LOGO SHOWCASE */}
          <div className="flex justify-center my-12">
            <ArtifyLogo size="2xl" showText={true} useImage={true} className="hover:scale-105 transition-transform duration-300" />
          </div>

          {/* HERO TYPOGRAPHY WITH PARALLAX EFFECT */}
          <motion.div
            style={{ y: heroTextY, opacity: heroOpacity }}
            className="max-w-4xl z-10 mt-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C3B1A]/10 text-[#8C3B1A] text-xs font-bold tracking-widest uppercase mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              India's Trusted Handcrafted Registry
            </span>

            <h1 className="font-elegant text-5xl md:text-7xl font-black text-[#2C1B11] tracking-tight leading-[1.1] mb-6">
              Every Handmade Object <br />
              <span className="bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] bg-clip-text text-transparent italic font-normal px-2 font-artistic">
                Carries a Human Story
              </span>
            </h1>

            <p className="text-base md:text-xl text-[#2C1B11]/70 max-w-2xl mx-auto font-medium leading-relaxed mb-10 font-friendly">
              Discover verified Indian masterpieces. Every design is structurally tracked, every artisan is historically celebrated, and every single purchase actively preserves generational heritage.
            </p>

            {/* CREATIVE INTERACTIVE ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/buyer/marketplace">
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 font-modern tracking-wide">
                  Meet Artisan
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* --- AESTHETIC FLOATING IMAGE GALLERY --- */}
        <section className="relative py-24 overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F5F1E8] via-[#F0E6D2] to-[#F5F1E8]" />

          {/* Floating Images with Blur Effect */}
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#2C1B11] mb-4 font-elegant">
                Artisan Masterpieces
              </h2>
              <p className="text-lg text-[#2C1B11]/70 max-w-2xl mx-auto font-friendly">
                Authentic craftsmanship captured in every frame
              </p>
            </div>

            {/* Floating Image Grid */}
            <div className="relative h-96 md:h-[500px]">
              {/* Image 1 - Top Left */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="absolute top-0 left-[10%] w-48 h-48 md:w-64 md:h-64 group cursor-pointer"
              >
                <div className="relative w-full h-full">
                  {/* Blurred Background Frame */}
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 transform rotate-2 group-hover:rotate-0 transition-all duration-500" />

                  {/* Main Image */}
                  <div className="relative w-full h-full p-4">
                    <img
                      src="/images/img_1ab.jpg"
                      alt="Artisan Craft 1"
                      className="w-full h-full object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Aesthetic Overlay */}
                    <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-[#8B4513]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Floating Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/20 to-[#8B4513]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                </div>
              </motion.div>

              {/* Image 2 - Top Right */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-8 right-[15%] w-40 h-40 md:w-56 md:h-56 group cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 transform -rotate-2 group-hover:rotate-0 transition-all duration-500" />

                  <div className="relative w-full h-full p-4">
                    <img
                      src="/images/img2_ab.avif"
                      alt="Artisan Craft 2"
                      className="w-full h-full object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-[#722F37]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="absolute -inset-4 bg-gradient-to-r from-[#FF69B4]/20 to-[#722F37]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                </div>
              </motion.div>

              {/* Image 3 - Bottom Left */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 2 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-16 left-[20%] w-44 h-44 md:w-60 md:h-60 group cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 transform rotate-1 group-hover:rotate-0 transition-all duration-500" />

                  <div className="relative w-full h-full p-4">
                    <img
                      src="/images/img3_ab.jpg"
                      alt="Artisan Craft 3"
                      className="w-full h-full object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-[#A0522D]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="absolute -inset-4 bg-gradient-to-r from-[#8B4513]/20 to-[#A0522D]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                </div>
              </motion.div>

              {/* Image 4 - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: -1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-8 right-[10%] w-52 h-52 md:w-68 md:h-68 group cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 transform -rotate-1 group-hover:rotate-0 transition-all duration-500" />

                  <div className="relative w-full h-full p-4">
                    <img
                      src="/images/img4_ab.jpg"
                      alt="Artisan Craft 4"
                      className="w-full h-full object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-[#4682B4]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="absolute -inset-4 bg-gradient-to-r from-[#87CEEB]/20 to-[#4682B4]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                </div>
              </motion.div>

              {/* Center Floating Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40"
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/30 to-[#8B4513]/30 rounded-full blur-2xl animate-pulse" />
                  <div className="relative w-full h-full bg-white/90 backdrop-blur-md rounded-full border border-white/50 shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl mb-2">✨</div>
                      <div className="text-xs md:text-sm font-bold text-[#8B4513] tracking-wider">AUTHENTIC</div>
                      <div className="text-xs text-[#8B4513]/70">CRAFTS</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#D4AF37]/40 rounded-full animate-ping" />
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#8B4513]/40 rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#A0522D]/40 rounded-full animate-bounce" />
              </div>

              {/* Additional Floating Mini Images */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
                whileInView={{ opacity: 0.7, scale: 1, rotate: 5 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute top-12 left-[45%] w-20 h-20 md:w-24 md:h-24 group cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 transform rotate-12 group-hover:rotate-6 transition-all duration-500" />
                  <div className="relative w-full h-full p-2">
                    <img
                      src="/images/states/kashmir.jpg"
                      alt="Kashmir Craft"
                      className="w-full h-full object-cover rounded-xl shadow-md group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#8B008B]/10 to-[#9932CC]/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                whileInView={{ opacity: 0.6, scale: 1, rotate: -4 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute bottom-32 right-[45%] w-16 h-16 md:w-20 md:h-20 group cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 transform -rotate-8 group-hover:-rotate-4 transition-all duration-500" />
                  <div className="relative w-full h-full p-2">
                    <img
                      src="/images/states/rajasthan.jpg"
                      alt="Rajasthan Craft"
                      className="w-full h-full object-cover rounded-xl shadow-md group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#4169E1]/10 to-[#6495ED]/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
                whileInView={{ opacity: 0.5, scale: 1, rotate: 8 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute top-1/3 right-[5%] w-14 h-14 md:w-18 md:h-18 group cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 transform rotate-15 group-hover:rotate-8 transition-all duration-500" />
                  <div className="relative w-full h-full p-1.5">
                    <img
                      src="/images/states/kerala.webp"
                      alt="Kerala Craft"
                      className="w-full h-full object-cover rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#228B22]/10 to-[#32CD32]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
                whileInView={{ opacity: 0.4, scale: 1, rotate: -6 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="absolute bottom-1/4 left-[5%] w-12 h-12 md:w-16 md:h-16 group cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 transform -rotate-12 group-hover:-rotate-6 transition-all duration-500" />
                  <div className="relative w-full h-full p-1">
                    <img
                      src="/images/states/gujrat.webp"
                      alt="Gujarat Craft"
                      className="w-full h-full object-cover rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#FF1493]/10 to-[#FF69B4]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- DYNAMIC SHOWCASE INTERIOR SECTION --- */}
        <section className="relative max-w-7xl mx-auto px-6 py-24 z-30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* PREMIUM BRANDED PASSPORT BOX DECAL */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8B4513]/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-2xl bg-[#F0E6D2] border border-[#8B4513]/20 p-8 shadow-xl transition-transform duration-500 group-hover:scale-[1.01]">
                <div className="w-12 h-12 rounded-xl bg-[#8B4513]/10 flex items-center justify-center text-[#8B4513] mb-6">
                  ✋
                </div>
                <h3 className="font-elegant text-2xl font-bold mb-3 text-[#2C1B11]">The Premium Authentication Passport</h3>
                <p className="text-[#2C1B11]/70 leading-relaxed mb-6 font-friendly">
                  Every asset bought through Artify Bharat ships alongside an embossed, hand-signed steel validation tag linking back to the cryptographic ledger entry of the individual creator.
                </p>
                <div className="h-1 w-20 bg-[#8B4513] rounded-full" />
              </div>
            </div>

            {/* LIVE DIGITAL REGISTRY INSIGHT */}
            <div className="p-4 border-2 border-dashed border-[#8B4513]/20 rounded-3xl bg-white/40 backdrop-blur-sm">
              <div className="bg-[#2C1B11] text-[#F5F1E8] p-6 rounded-2xl shadow-inner">
                <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                  <span className="text-xs font-mono text-[#D4AF37]">ARTIFY_REGISTRY // VERIFIED</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <p className="font-artistic text-xl italic text-white/90 mb-4">
                  "This Madhubani composition utilizes raw organic plant dyes sourced across Mithila..."
                </p>
                <div className="flex items-center gap-3 text-xs text-white/50 font-mono">
                  <span>Origin: Bihar, IN</span>
                  <span>•</span>
                  <span>ID: #AB-88392</span>
                  <span>•</span>
                  <span className="text-[#D4AF37]">AUTHENTICATED ✓</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- INDIAN CRAFT STORIES SECTION --- */}
        <section className="relative max-w-7xl mx-auto px-6 py-24 z-30">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2C1B11] mb-4 font-elegant">
              Heritage Across India
            </h2>
            <p className="text-lg text-[#2C1B11]/70 max-w-2xl mx-auto font-friendly">
              Journey through India's diverse craft traditions. Each state tells a unique story of artisanship,
              culture, and heritage passed down through generations.
            </p>
          </div>

          <IndianCraftStories autoRotate={true} rotationInterval={6000} />
        </section>

        {/* --- HOW IT WORKS SECTION --- */}
        <HowItWorks />

        {/* --- FEATURED MASTERPIECES SECTION --- */}
        <FeaturedMasterpieces products={getFeaturedProducts()} />

        {/* --- ARTISAN SPOTLIGHT SECTION --- */}
        <ArtisanSpotlight />
      </div>

      {/* --- FOOTER SECTION --- */}
      <div className="-mt-8">
        <Footer />
      </div>
    </>
  );
}