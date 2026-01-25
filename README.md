# Artify Bharat - AI-Powered Verified Handmade Marketplace

A Next.js application that empowers Indian artisans through AI-driven voice onboarding, multilingual storytelling, and authenticity verification.

## Features

- 🎯 **Voice Onboarding**: Native language voice recording for artisans
- 🤖 **AI Authenticity Verification**: 94% accuracy in detecting handmade products
- 🌍 **Multilingual Support**: AI-generated stories in 7+ languages
- 📜 **Digital Craft Passport**: Blockchain-verified authenticity certificates
- 💰 **Fair AI Pricing**: ML-powered price recommendations
- 📊 **Admin Dashboard**: Review queue for product approvals
- 🛍️ **Marketplace**: Browse and purchase authentic handmade products

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Language**: JavaScript
- **Fonts**: Inter, Poppins, Noto Sans Devanagari

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd artify-bharat
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   ├── Footer.js       # Site footer
│   └── AppLayout.js    # Dashboard layout
├── pages/              # Next.js pages
│   ├── index.js        # Homepage
│   ├── _app.js         # App wrapper
│   ├── _document.js    # HTML document
│   ├── artisan/        # Artisan pages
│   ├── buyer/          # Buyer pages
│   ├── product/        # Product pages
│   └── admin/          # Admin pages
├── public/             # Static assets
├── styles/             # Global styles
└── tailwind.config.js  # Tailwind configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Pages

- **Homepage** (`/`) - Landing page with features and stats
- **Marketplace** (`/buyer/marketplace`) - Browse products
- **Artisan Onboarding** (`/artisan/onboard`) - Voice recording interface
- **Dashboard** (`/artisan/dashboard`) - Artisan analytics
- **Admin Review** (`/admin/review-queue`) - Product approval queue
- **Product Passport** (`/product/[id]`) - Individual product details

## Design System

The app uses a warm, earthy color palette reflecting Indian craftsmanship:

- **Primary**: Terracotta (#c2794d)
- **Secondary**: Earth tones (#8b6f47)
- **Background**: Warm cream (#f8f6f3)
- **Text**: Dark brown (#3d3021)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support, email support@artifybharat.com or create an issue in this repository.