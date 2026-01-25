/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f3',
          100: '#f9ede1',
          200: '#f2d7c2',
          300: '#e8bb97',
          400: '#dc956a',
          500: '#d4784a',
          600: '#c6633f',
          700: '#a54d36',
          800: '#854032',
          900: '#6d362b',
        },
        earth: {
          50: '#faf9f7',
          100: '#f2f0eb',
          200: '#e8e4db',
          300: '#d9d2c4',
          400: '#c5b8a4',
          500: '#b5a389',
          600: '#a08f73',
          700: '#8a7860',
          800: '#726451',
          900: '#5d5242',
        },
        terracotta: {
          50: '#fdf6f3',
          100: '#fae9e1',
          200: '#f4d6c8',
          300: '#ecbaa3',
          400: '#e19576',
          500: '#d87651',
          600: '#c85d3a',
          700: '#a74a2f',
          800: '#8a3f2a',
          900: '#723627',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        warm: '0 4px 20px rgba(212, 120, 74, 0.15)',
        soft: '0 2px 12px rgba(0, 0, 0, 0.08)',
        glow: '0 0 30px rgba(212, 120, 74, 0.3)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}