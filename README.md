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
- 🔐 **OAuth Authentication**: Login with Google and Facebook

## Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Language**: JavaScript
- **Fonts**: Inter, Poppins, Noto Sans Devanagari

### Backend
- **Framework**: Django 6.0
- **API**: Django REST Framework
- **Authentication**: JWT + OAuth (Google, Facebook)
- **Database**: SQLite (development) / PostgreSQL (production)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Python 3.13+
- uv (Python package manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd artify-bharat
```

2. **Backend Setup**:
```bash
cd backend
uv sync
python manage.py migrate
python manage.py runserver
```

3. **Frontend Setup**:
```bash
cd frontend
npm install
npm run dev
```

4. **Google OAuth Setup** (Required for Google Login):

   a. **Google Cloud Console Configuration**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Configure OAuth consent screen (add test users if in Testing mode)
   - Add Authorized JavaScript origins: `http://localhost:3000`
   - Add Authorized redirect URIs:
     - `http://localhost:3000`
     - `http://localhost:3000/login/login`
   - Copy the Client ID

   b. **Backend Configuration**:
   - Create `backend/.env` file:
   ```bash
   SECRET_KEY=your-secret-key
   DEBUG=True
   GOOGLE_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
   ```

   c. **Frontend Configuration**:
   - Create `frontend/.env.local` file:
   ```bash
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

   d. **Restart Both Servers**:
   ```bash
   # Backend
   cd backend
   uv run python manage.py runserver

   # Frontend (new terminal)
   cd frontend
   npm run dev
   ```

   e. **Test Login**:
   - Open incognito window: `http://localhost:3000/login/login`
   - Click "Sign in with Google"
   - Use email added in Google Console test users

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── backend/            # Django backend
│   ├── core/          # User authentication & OAuth
│   ├── store/         # Marketplace logic
│   ├── marketplace/   # Django settings
│   └── OAUTH_SETUP.md # OAuth configuration guide
├── frontend/          # Next.js frontend
│   ├── components/    # Reusable UI components
│   ├── pages/         # Next.js pages
│   ├── utils/         # Helper functions & API calls
│   └── styles/        # Global styles
├── microservices/     # AI services
└── OAUTH_IMPLEMENTATION_SUMMARY.md # OAuth details
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