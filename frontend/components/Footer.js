/**
 * FOOTER COMPONENT - Artify Bharat
 * 
 * Comprehensive site footer with company information, navigation links,
 * social media integration, and newsletter signup.
 * 
 * Features:
 * - Company branding and contact information
 * - Organized navigation sections (Explore, Mission, Support)
 * - Custom SVG social media icons (Instagram, LinkedIn, Twitter, YouTube)
 * - Newsletter subscription form
 * - Legal links and copyright information
 * - Responsive design with glass morphism effects
 * 
 * Design:
 * - Brown/terracotta color scheme matching brand
 * - Gradient backgrounds and decorative elements
 * - Hover animations and transitions
 */

import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// CUSTOM SOCIAL MEDIA ICON COMPONENTS
// These are custom SVG components since Lucide React doesn't include social media icons
const InstagramIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const LinkedinIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const TwitterIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const YoutubeIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

export default function Footer() {
    const exploreLinks = [
        { name: 'Crafts Marketplace', href: '/buyer/marketplace' },
        { name: 'Meet Artisans', href: '/artisans' },
        { name: 'State Registries', href: '/states' },
        { name: 'GI-Tagged Arts', href: '/gi-tagged' },
    ];

    const missionLinks = [
        { name: 'Our Story', href: '/our-story' },
        { name: 'Artisan Welfare Fund', href: '/welfare-fund' },
        { name: 'Sustainability', href: '/sustainability' },
        { name: 'Verification Process', href: '/verification' },
    ];

    const supportLinks = [
        { name: 'Help Center', href: '/help' },
        { name: 'Shipping & Returns', href: '/shipping' },
        { name: 'Track Order', href: '/track-order' },
        { name: 'Contact Us', href: '/contact' },
    ];

    const socialLinks = [
        {
            name: 'LinkedIn',
            href: 'https://linkedin.com/company/artify-bharat',
            icon: LinkedinIcon,
            color: 'hover:text-blue-400'
        },
        {
            name: 'Twitter',
            href: 'https://twitter.com/artifybharat',
            icon: TwitterIcon,
            color: 'hover:text-blue-400'
        },
        {
            name: 'Instagram',
            href: 'https://instagram.com/artifybharat',
            icon: InstagramIcon,
            color: 'hover:text-pink-400'
        },
        {
            name: 'YouTube',
            href: 'https://youtube.com/@artifybharat',
            icon: YoutubeIcon,
            color: 'hover:text-red-400'
        },
    ];

    const legalLinks = [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Artisan Code of Conduct', href: '/artisan-code' },
    ];

    return (
        <footer className="bg-gradient-to-br from-[#2c1b11] via-[#3d2817] to-[#2c1b11] text-[#f5f2ed] relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-[#d4784a] rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#8b6f47] rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#d4af37] rounded-full blur-2xl"></div>
            </div>

            {/* Main Footer Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
                {/* Top Section - Company Info + Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Company Info Column */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Logo and Brand */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4784a]/20 to-[#8b6f47]/20 rounded-xl blur-lg"></div>
                                    <div className="relative bg-[#f5f2ed]/10 backdrop-blur-sm p-3 rounded-xl border border-[#f5f2ed]/20">
                                        <div className="w-8 h-8 bg-[#d4784a] rounded-lg flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">AB</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-artistic font-bold text-[#f5f2ed]">
                                        Artify Bharat
                                    </h3>
                                </div>
                            </div>

                            <p className="text-[#d4c5b0] font-friendly text-lg leading-relaxed">
                                Authentic Indian Art | Verified & Preserved
                            </p>
                        </div>

                        {/* Location */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-[#d4c5b0]">
                                <MapPin className="w-5 h-5 text-[#d4784a] mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-[#f5f2ed]">Panipat, Haryana, India</p>
                                    <p className="text-sm font-friendly opacity-90">The historic city of weavers</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-[#d4c5b0]">
                                <Mail className="w-5 h-5 text-[#d4784a] flex-shrink-0" />
                                <a
                                    href="mailto:support@artify.com"
                                    className="font-medium hover:text-[#d4784a] transition-colors duration-300"
                                >
                                    support@artify.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Explore Links */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-artistic font-bold text-[#f5f2ed] border-b border-[#d4784a]/30 pb-2">
                            Explore
                        </h4>
                        <ul className="space-y-3">
                            {exploreLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-[#d4c5b0] hover:text-[#d4784a] transition-colors duration-300 font-friendly flex items-center gap-2 group"
                                    >
                                        <span>{link.name}</span>
                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Our Mission Links */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-artistic font-bold text-[#f5f2ed] border-b border-[#d4784a]/30 pb-2">
                            Our Mission
                        </h4>
                        <ul className="space-y-3">
                            {missionLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-[#d4c5b0] hover:text-[#d4784a] transition-colors duration-300 font-friendly flex items-center gap-2 group"
                                    >
                                        <span>{link.name}</span>
                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-artistic font-bold text-[#f5f2ed] border-b border-[#d4784a]/30 pb-2">
                            Support
                        </h4>
                        <ul className="space-y-3">
                            {supportLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-[#d4c5b0] hover:text-[#d4784a] transition-colors duration-300 font-friendly flex items-center gap-2 group"
                                    >
                                        <span>{link.name}</span>
                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Social Media & Newsletter Section */}
                <div className="border-t border-[#d4784a]/20 pt-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                        {/* Social Media Links */}
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <h5 className="text-lg font-artistic font-semibold text-[#f5f2ed]">
                                Connect With Us
                            </h5>
                            <div className="flex items-center gap-4">
                                {socialLinks.map((social, index) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-3 bg-[#f5f2ed]/10 backdrop-blur-sm rounded-xl border border-[#f5f2ed]/20 text-[#d4c5b0] ${social.color} transition-all duration-300 hover:scale-110 hover:bg-[#f5f2ed]/20 group`}
                                            aria-label={`Follow us on ${social.name}`}
                                        >
                                            <IconComponent className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <span className="text-[#d4c5b0] font-friendly whitespace-nowrap">
                                Stay updated with artisan stories
                            </span>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-4 py-2 bg-[#f5f2ed]/10 backdrop-blur-sm border border-[#f5f2ed]/20 rounded-lg text-[#f5f2ed] placeholder-[#d4c5b0]/70 focus:outline-none focus:border-[#d4784a] transition-colors duration-300"
                                />
                                <button className="px-6 py-2 bg-gradient-to-r from-[#d4784a] to-[#8b6f47] text-[#f5f2ed] rounded-lg hover:shadow-lg transition-all duration-300 font-medium">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Legal Bar */}
                <div className="border-t border-[#d4784a]/20 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                        {/* Copyright */}
                        <div className="text-center md:text-left">
                            <p className="text-[#d4c5b0] font-friendly">
                                © 2026 Artify Bharat. All rights reserved.
                                <span className="text-[#d4784a] font-medium"> Preserving generational heritage.</span>
                            </p>
                        </div>

                        {/* Legal Links */}
                        <div className="flex flex-wrap justify-center md:justify-end items-center gap-1 text-sm">
                            {legalLinks.map((link, index) => (
                                <span key={index} className="flex items-center">
                                    <Link
                                        href={link.href}
                                        className="text-[#d4c5b0] hover:text-[#d4784a] transition-colors duration-300 font-friendly px-2 py-1"
                                    >
                                        {link.name}
                                    </Link>
                                    {index < legalLinks.length - 1 && (
                                        <span className="text-[#d4784a]/50">|</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Decorative Bottom Element */}
                <div className="mt-8 pt-6 border-t border-[#d4784a]/10">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#d4784a]/10 to-[#8b6f47]/10 rounded-full border border-[#d4784a]/20">
                            <div className="w-2 h-2 bg-[#d4784a] rounded-full animate-pulse"></div>
                            <span className="text-[#d4c5b0] text-sm font-friendly">
                                Crafted with ❤️ for Indian artisans
                            </span>
                            <div className="w-2 h-2 bg-[#d4784a] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4784a] via-[#8b6f47] to-[#d4af37]"></div>
        </footer>
    );
}