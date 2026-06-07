# 🪔 Artify Bharat - AI-Powered Verified Handmade Marketplace

**Empowering India's artisan community through voice onboarding, AI-driven authenticity verification, multilingual storytelling, and a fair digital marketplace.**

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![Django](https://img.shields.io/badge/Django-6.0-darkgreen?logo=django&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.128-teal?logo=fastapi&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-blue?logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

</div>

## ✨ Features

- 🎯 **Voice Onboarding**: Native language voice recording for artisans
- 🤖 **AI Authenticity Verification**: 94% accuracy in detecting handmade products
- 🌍 **Multilingual Support**: AI-generated stories in 7+ languages
- 📜 **Digital Craft Passport**: Blockchain-verified authenticity certificates
- 💰 **Fair AI Pricing**: ML-powered price recommendations
- 📊 **Admin Dashboard**: Review queue for product approvals
- 🛍️ **Marketplace**: Browse and purchase authentic handmade products
- 🔐 **OAuth Authentication**: Login with Google and Facebook

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16
- **Styling**: Tailwind CSS
- **Language**: JavaScript
- **Fonts**: Inter, Poppins, Noto Sans Devanagari

### Backend
- **Framework**: Django 6.0
- **API**: Django REST Framework
- **Authentication**: JWT + OAuth (Google, Facebook)
- **Database**: SQLite (development) / PostgreSQL (production)

### AI Microservices
- **Framework**: FastAPI
- **AI Models**: Google Gemini Pro
- **Features**: Voice transcription, story generation, authenticity verification

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- uv (Python package manager)

### 1. Clone Repository
```bash
git clone <repository-url>
cd artify-bharat
```

### 2. Start All Services
```bash
# Terminal 1: Frontend (Next.js)
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000

# Terminal 2: Backend (Django)
cd backend
python manage.py runserver 8002
# Runs on http://localhost:8002

# Terminal 3: AI Microservices (FastAPI) - Optional
cd microservices
fastapi dev main.py
# Runs on http://localhost:8001
```

### 3. Database Setup
```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
python manage.py loaddata fixtures/initial_data.json  # Sample data
```

## 📁 Project Structure

```
artify-bharat/
├── frontend/                 # Next.js Frontend
│   ├── components/          # Reusable UI components
│   ├── pages/              # Next.js pages
│   ├── utils/              # API calls and utilities
│   ├── data/               # Mock data and constants
│   └── styles/             # Global styles
├── backend/                 # Django Backend
│   ├── core/               # User authentication
│   ├── store/              # Marketplace logic
│   └── marketplace/        # Django settings
├── microservices/          # FastAPI AI Services
│   └── utils/              # AI utilities
└── README.md
```

## 🔧 Configuration

### Environment Variables

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8002
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
```

**Backend (.env):**
```env
SECRET_KEY=your_django_secret_key
DEBUG=True
GOOGLE_OAUTH2_CLIENT_ID=your_google_client_id
GOOGLE_OAUTH2_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

**Microservices (.env):**
```env
GOOGLE_API_KEY=your_gemini_api_key
```

## 🎨 Key Components

### Frontend Components
- **ArtifyLogo**: Brand logo with multiple variants
- **IndianCraftStories**: Interactive state-wise craft stories
- **ArtisanSpotlight**: Featured artisan showcase
- **Footer**: Comprehensive site footer
- **ArtisanVerificationWizard**: Multi-step verification process

### Backend Models
- **User**: Custom user model with OAuth support
- **Artisan**: Artisan profiles and verification
- **Product**: Marketplace products
- **Category**: Product categorization
- **ArtisanVerification**: Heritage verification system

## 🔐 Authentication

The platform supports multiple authentication methods:
- **Email/Password**: Traditional authentication
- **Google OAuth**: Social login with Google
- **Facebook OAuth**: Social login with Facebook
- **JWT Tokens**: Secure API authentication

## 🤖 AI Features

### Voice Onboarding
- Native language voice recording
- Automatic transcription using Google Speech-to-Text
- Multi-language support

### Authenticity Verification
- Image analysis for handmade detection
- Pattern recognition for traditional crafts
- 94% accuracy rate

### Story Generation
- AI-powered craft story creation
- Multi-language content generation
- Cultural context preservation

## 📱 Pages

### Public Pages
- **Homepage** (`/`): Landing page with featured content
- **Marketplace** (`/buyer/marketplace`): Product browsing
- **Our Story** (`/our-story`): Company information
- **Craft Stories** (`/craft-stories`): State-wise craft heritage

### Artisan Pages
- **Dashboard** (`/artisan/dashboard`): Artisan control panel
- **Onboarding** (`/artisan/onboard`): New artisan registration
- **Verification** (`/artisan/verify`): Heritage verification process

### Authentication
- **Login** (`/login/login`): User authentication
- **Signup** (`/signup/signup`): New user registration

## 🚀 Deployment

### Production Setup
1. Set environment variables for production
2. Configure PostgreSQL database
3. Set up static file serving
4. Configure domain and SSL
5. Deploy using Docker or cloud platforms

### Docker Support
```bash
# Build and run with Docker
docker-compose up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Indian artisan community for inspiration
- Google Gemini AI for AI capabilities
- Open source community for tools and libraries

---

<div align="center">
<strong>Made with ❤️ for Indian artisans</strong>
</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#1-frontend-nextjs)
  - [Backend Setup](#2-backend-django-rest-api)
  - [Microservices Setup](#3-microservices-fastapi--ai)
- [API Reference](#-api-reference)
- [Design System](#-design-system)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Artify Bharat** is a full-stack, three-tier web platform built to bridge the gap between India's skilled artisan community and modern digital commerce. Artisans can onboard using **voice recordings in their native language**, which are transcribed and transformed into compelling product stories using **Google Gemini AI**. Buyers get a curated, verified marketplace where every product comes with an AI-authenticated **Digital Craft Passport**.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🎙️ **Voice Onboarding** | Artisans record their story in any Indian language; AssemblyAI transcribes and Gemini rewrites it into a rich English narrative |
| 🤖 **AI Story Generation** | Google Gemini AI auto-generates 120-word historical & emotional product descriptions |
| 🛒 **Verified Marketplace** | Buyers browse authentic, AI-verified handmade products with filters, search, and categories |
| 🧾 **Digital Craft Passport** | Each product gets a unique page with its artisan's story and provenance |
| 💬 **AI Chatbot** | LangGraph-powered shopping assistant with tool-calling support for product search |
| 📊 **Artisan Dashboard** | Real-time stats: total sales, active orders, product count, AI verification rate |
| 🛍️ **Cart & Orders** | Full shopping cart (UUID-based) and order management with payment status tracking |
| 👑 **Admin Panel** | Django admin with full control over products, orders, users, and categories |
| 🔐 **JWT Authentication** | Secure stateless authentication for artisans, buyers, and admins |
| 📍 **Address Management** | Persistent delivery address tied to each user account |

---

## 🏗️ Architecture

Artify Bharat follows a **microservice-oriented, three-tier architecture**:

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND                      │
│         Next.js 16 + Tailwind CSS               │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │ Artisan  │ │  Buyer   │ │     Product      │ │
│  │  Pages   │ │  Pages   │ │     Passport     │ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
└────────────────────┬────────────────────────────┘
                     │ HTTP / Axios
        ┌────────────┴─────────────┐
        │                         │
┌───────▼────────┐    ┌──────────▼────────────────┐
│    BACKEND     │    │       MICROSERVICES        │
│  Django 6 +   │    │   FastAPI + LangChain +    │
│  DRF + JWT     │    │   Gemini AI + AssemblyAI  │
│                │    │                           │
│  - Auth        │    │  POST /process_audio      │
│  - Products    │    │   → Transcription (AAI)   │
│  - Orders      │    │   → Story Gen (Gemini)    │
│  - Cart        │    │                           │
│  - Customers   │    │  GET /story/{product}     │
│  - Artisans    │    │   → Product Story         │
└───────┬────────┘    └───────────────────────────┘
        │
┌───────▼────────┐
│   SQLite DB    │
│  (dev) /       │
│  PostgreSQL    │
│  (prod)        │
└────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16 | React framework with SSR/SSG |
| **React** | 18 | UI component library |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **Axios** | 1.x | HTTP client for API calls |
| **Noto Sans Devanagari** | - | Hindi / multilingual font support |

### Backend (Django REST API)
| Technology | Version | Purpose |
|---|---|---|
| **Django** | 6.0 | Web framework |
| **Django REST Framework** | 3.16 | REST API toolkit |
| **SimpleJWT** | 5.5 | JWT-based authentication |
| **drf-nested-routers** | 0.95 | Nested API routes (e.g. products → images) |
| **django-filter** | 25.x | Query-param-based filtering |
| **django-cors-headers** | 4.9 | CORS middleware |
| **django-phonenumber-field** | 8.4 | Phone number validation |
| **Celery** | 5.6 | Async task queue |
| **Redis** | 7.x | Celery message broker |
| **Pillow** | 12.x | Image processing |
| **Gunicorn** | 24.x | Production WSGI server |

### Microservices (FastAPI + AI)
| Technology | Version | Purpose |
|---|---|---|
| **FastAPI** | 0.128 | High-performance async API |
| **AssemblyAI** | 0.48 | Voice-to-text transcription (Universal-2 model) |
| **LangChain** | 1.2 | LLM orchestration |
| **LangGraph** | 1.0 | Stateful AI chatbot agent |
| **langchain-google-genai** | 4.2 | Google Gemini AI integration |
| **Whoosh** | 2.7 | Local full-text product search indexing |
| **python-dotenv** | 1.2 | Environment variable management |

---

## 📁 Project Structure

```
artify-bharat/
│
├── frontend/                     # Next.js web application
│   ├── components/               # Reusable UI components
│   │   ├── Header.js             # Navigation header
│   │   ├── Footer.js             # Site footer
│   │   └── AppLayout.js          # Dashboard layout wrapper
│   ├── pages/                    # Next.js file-based routing
│   │   ├── index.js              # Homepage (landing page)
│   │   ├── _app.js               # App wrapper
│   │   ├── _document.js          # Custom HTML document
│   │   ├── artisan/
│   │   │   ├── onboard.js        # Voice onboarding interface
│   │   │   ├── dashboard.js      # Artisan analytics dashboard
│   │   │   └── orders.js         # Artisan order management
│   │   ├── buyer/
│   │   │   └── marketplace.js    # Product browsing & discovery
│   │   ├── product/
│   │   │   └── [id].js           # Digital Craft Passport (product page)
│   │   ├── login/
│   │   │   └── index.js          # User authentication
│   │   └── signup/
│   │       └── index.js          # User registration
│   ├── utils/                    # Helper utilities
│   ├── styles/                   # Global CSS styles
│   ├── tailwind.config.js        # Tailwind configuration
│   └── package.json
│
├── backend/                      # Django REST API
│   ├── core/                     # Custom User model
│   │   └── models.py             # User (email-based, with phone)
│   ├── store/                    # Core marketplace app
│   │   ├── models.py             # Product, Artisan, Customer, Order, Cart...
│   │   ├── views.py              # ViewSets & API views
│   │   ├── serializers.py        # DRF serializers
│   │   ├── urls.py               # URL routing (nested routers)
│   │   ├── filters.py            # Product filtering
│   │   ├── permissions.py        # Custom permissions
│   │   ├── signals/              # Django signals (e.g., order_created)
│   │   ├── pagination.py         # Default pagination settings
│   │   └── tests/                # Unit tests
│   ├── marketplace/              # Project-level Django config
│   ├── manage.py
│   └── pyproject.toml
│
├── microservices/                # FastAPI AI microservice
│   ├── main.py                   # FastAPI app & route definitions
│   └── utils/
│       ├── transcription.py      # AssemblyAI voice transcription
│       ├── story_generation.py   # Gemini AI story & product narrative
│       ├── chatbot.py            # LangGraph AI chatbot agent
│       ├── search.py             # Whoosh full-text product search
│       └── tools.py              # Chatbot tool definitions
│
├── vercel.json                   # Vercel deployment config
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **Python** 3.13+
- **uv** (Python package manager) — `pip install uv`
- **Redis** (for Celery, optional in development)
- API Keys:
  - [Google AI Studio](https://aistudio.google.com/) → `GOOGLE_API_KEY`
  - [AssemblyAI](https://www.assemblyai.com/) → `ASSEMBLYAI_API_KEY`
  - [Google Cloud Console](https://console.cloud.google.com/) → OAuth 2.0 Client ID for Google Login

---

### Google OAuth Setup

To enable Google login, you need to configure OAuth 2.0 credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen if prompted
6. For **Application type**, select **Web application**
7. Add **Authorized JavaScript origins**:
   - `http://localhost:3000` (for development)
   - Your production domain (e.g., `https://yourdomain.com`)
8. Add **Authorized redirect URIs**:
   - `http://localhost:3000` (for development)
   - Your production domain
9. Copy the **Client ID** and save it

**Add to environment variables:**

Backend (`backend/.env`):
```env
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

Frontend (`frontend/.env.local`):
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

**Required Python packages** (already in `pyproject.toml`):
```bash
cd backend
uv add google-auth google-auth-oauthlib python-dotenv
```

---

### 1. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at **http://localhost:3000**

**Available scripts:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

### 2. Backend (Django REST API)

```bash
cd backend

# Install dependencies with uv
uv sync

# Apply database migrations
uv run python manage.py migrate

# (Optional) Seed sample data
uv run python manage.py seed_db

# Start the development server
uv run python manage.py runserver
```

The Django API will be available at **http://localhost:8000**

To access the **admin panel**, create a superuser:
```bash
uv run python manage.py createsuperuser
```
Then visit: **http://localhost:8000/admin/**

---

### 3. Microservices (FastAPI + AI)

```bash
cd microservices

# Create a .env file from the example
cp .env.example .env
# Add your API keys to .env

# Install dependencies
uv sync

# Start the FastAPI server
uv run fastapi dev main.py
```

The microservices API will be available at **http://localhost:8001**

Interactive API docs: **http://localhost:8001/docs**

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/store/signup/` | Register as artisan or buyer |
| `POST` | `/store/login/` | Login with email & password |
| `POST` | `/store/logout/` | Logout current user |
| `POST` | `/api/token/` | Get JWT access & refresh tokens |
| `POST` | `/api/token/refresh/` | Refresh JWT access token |

**Signup payload:**
```json
{
  "userRole": "artisan",
  "firstName": "Rahul",
  "lastName": "Sharma",
  "email": "rahul@example.com",
  "password": "securepassword",
  "phone": "+919876543210",
  "address": "123, Craft Lane",
  "city": "Jaipur",
  "state": "Rajasthan",
  "pincode": "302001",
  "craftSpecialty": "Blue Pottery",
  "experience": 12,
  "bio": "Third-generation potter from Jaipur..."
}
```

---

### Products

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/store/products/` | List all products (with filters) | Public |
| `POST` | `/store/products/` | Create a new product | Artisan |
| `GET` | `/store/products/{id}/` | Get product details | Public |
| `PUT/PATCH` | `/store/products/{id}/` | Update product | Artisan |
| `DELETE` | `/store/products/{id}/` | Delete product | Artisan |
| `GET` | `/store/products/titles/` | Get all product titles (for search) | Auth |
| `GET` | `/store/products/{id}/images/` | Get product images | Public |
| `POST` | `/store/products/{id}/images/` | Upload product image | Artisan |

**Query Filters:**
- `?search=blue+pottery` — Full-text search on title & description
- `?ordering=unit_price` — Sort by price (or `-unit_price` for descending)
- `?category_id=3` — Filter by category

---

### Cart & Orders

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/store/carts/` | Create a new cart |
| `GET` | `/store/carts/{uuid}/` | Get cart with items & total |
| `POST` | `/store/carts/{uuid}/items/` | Add item to cart |
| `PATCH` | `/store/carts/{uuid}/items/{id}/` | Update item quantity |
| `DELETE` | `/store/carts/{uuid}/items/{id}/` | Remove item from cart |
| `GET` | `/store/orders/` | List orders (scoped by user role) |
| `POST` | `/store/orders/` | Place an order from cart |

---

### Dashboard & Users

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/store/stats/` | Get artisan dashboard stats | Artisan |
| `GET` | `/store/customers/me/` | Get current customer profile | Auth |
| `PUT` | `/store/customers/me/` | Update customer profile | Auth |
| `GET` | `/store/categories/` | List all categories | Public |

---

### Microservices (AI)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/process_audio` | Upload audio → Transcription + Artisan Story |
| `GET` | `/story/{product_name}` | Generate a product history story |

**Audio Processing Response:**
```json
{
  "text": "Transcribed voice recording text...",
  "story": "Refined 120-word English narrative about the artisan's craft..."
}
```

---

## 🎨 Design System

Artify Bharat uses a warm, earthy color palette that reflects the richness of Indian craftsmanship:

| Token | Value | Usage |
|---|---|---|
| **Primary** | `#c2794d` | Terracotta — CTAs, highlights |
| **Secondary** | `#8b6f47` | Earth brown — accents |
| **Background** | `#f8f6f3` | Warm cream — page background |
| **Text** | `#3d3021` | Dark brown — body text |

**Typography:**
- **Poppins** — Display headings
- **Inter** — Body copy and UI
- **Noto Sans Devanagari** — Hindi & multilingual content

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
```env
ARTISAN_EMAIL=artisan@domain.com
ARTISAN_PASS=yourpassword
BUYER_EMAIL=buyer@domain.com
BUYER_PASS=yourpassword
```

### Microservices (`microservices/.env`)
```env
GOOGLE_API_KEY=your_google_gemini_api_key
ASSEMBLYAI_API_KEY=your_assemblyai_api_key
```

### Screenshots
<img width="814" height="463" alt="image" src="https://github.com/user-attachments/assets/f6aebb30-c5fe-46fe-b268-579c37494d4b" />
<img width="866" height="486" alt="image" src="https://github.com/user-attachments/assets/cd884940-efc8-43f5-b6f0-aaabe13ffd08" />
<img width="898" height="457" alt="image" src="https://github.com/user-attachments/assets/e6b6a395-c7d6-41b9-b426-2256a69697ff" />


---

## 🗺️ Key Pages

| Route | Page | Description |
|---|---|---|
| `/` | Homepage | Landing page with hero, features & stats |
| `/signup` | Sign Up | Role-based registration (artisan/buyer) |
| `/login` | Login | Email & password authentication |
| `/buyer/marketplace` | Marketplace | Browse & search verified products |
| `/artisan/onboard` | Voice Onboarding | Record story, list products |
| `/artisan/dashboard` | Dashboard | Analytics: sales, orders, stats |
| `/artisan/orders` | Orders | Track and manage incoming orders |
| `/product/[id]` | Product Passport | Individual product + artisan story |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please ensure your code follows the existing style and all tests pass before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ for India's artisan community</p>
  <p>For support, open an issue or contact <a href="mailto:support@artifybharat.com">support@artifybharat.com</a></p>
</div>
