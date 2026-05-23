# 🛠️ Implementation Guide - Artify Bharat

This guide provides detailed implementation details for developers working on the Artify Bharat platform.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │  Microservices  │
│   (Next.js)     │◄──►│   (Django)      │◄──►│   (FastAPI)     │
│   Port: 3000    │    │   Port: 8002    │    │   Port: 8001    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎨 Frontend Implementation

### Component Structure
```
components/
├── ArtifyLogo.js           # Brand logo component
├── Footer.js               # Site footer
├── IndianCraftStories.js   # Interactive craft stories
├── ArtisanSpotlight.js     # Featured artisan display
├── HowItWorks.js          # Process explanation
├── FeaturedMasterpieces.js # Product showcase
└── verification/          # Verification wizard components
```

### Key Features Implemented

#### 1. Indian Craft Stories Component
- **File**: `components/IndianCraftStories.js`
- **Features**: Auto-rotation, manual navigation, touch/swipe support
- **Data**: Complete information for all 28+ Indian states
- **Animations**: Framer Motion for smooth transitions

#### 2. Artisan Verification System
- **Files**: `components/ArtisanVerificationWizard.js` + step components
- **Process**: 3-step heritage verification (Pedigree → Authenticity → Process)
- **Backend**: Full CRUD operations with file upload support

#### 3. Marketplace Search & Filters
- **File**: `pages/buyer/marketplace.js`
- **Features**: Category filters, price range, search, sorting
- **API Integration**: Real-time product fetching with pagination

### Styling Approach
- **Framework**: Tailwind CSS
- **Color Palette**: Authentic browns, terracotta, gold (#8B4513, #A0522D, #D4AF37)
- **Typography**: Multiple font families for different contexts
- **Responsive**: Mobile-first design approach

## 🔧 Backend Implementation

### Models Structure
```python
# core/models.py
class User(AbstractUser):
    # Custom user model with OAuth support
    
# store/models.py  
class Artisan(models.Model):
    # Artisan profiles and verification status
    
class Product(models.Model):
    # Marketplace products with media support
    
class ArtisanVerification(models.Model):
    # Heritage verification system
```

### API Endpoints
```
Authentication:
POST /api/token/          # JWT token generation
POST /api/token/refresh/  # Token refresh

Store:
GET  /store/products/     # List products with filters
POST /store/products/     # Create new product
GET  /store/categories/   # List categories
POST /store/verification/ # Submit verification

OAuth:
GET  /auth/google/        # Google OAuth
GET  /auth/facebook/      # Facebook OAuth
```

### Key Features Implemented

#### 1. OAuth Integration
- **Google OAuth**: Complete flow with profile data
- **Facebook OAuth**: User authentication and profile sync
- **JWT Tokens**: Secure API authentication with refresh

#### 2. File Upload System
- **Media Handling**: Images and videos for products
- **Verification Files**: Document upload for heritage verification
- **Storage**: Organized media structure with proper naming

#### 3. Database Seeding
- **Command**: `python manage.py seed_db`
- **Data**: 10 artisans, 20 customers, categories, sample orders
- **Credentials**: All seeded accounts use password: `password123`

## 🤖 AI Microservices Implementation

### Services Structure
```
utils/
├── chatbot.py          # AI chatbot functionality
├── description.py      # Product description generation
├── story_generation.py # Craft story creation
├── transcription.py    # Voice-to-text conversion
└── search.py          # Intelligent search
```

### AI Features
- **Voice Transcription**: Google Speech-to-Text integration
- **Story Generation**: Cultural context-aware content creation
- **Product Descriptions**: AI-generated authentic descriptions
- **Chatbot**: Customer support automation

## 🎯 Key Implementation Decisions

### 1. Component Reusability
- **ArtifyLogo**: Multiple size variants, image/text options
- **Footer**: Flexible props for different page contexts
- **Verification**: Modular step-based wizard pattern

### 2. State Management
- **Approach**: React hooks + local state
- **API Calls**: Centralized in `utils/apiCalls.js`
- **Error Handling**: Graceful fallbacks and user feedback

### 3. Authentication Flow
- **Strategy**: JWT with refresh tokens
- **Storage**: localStorage for client-side persistence
- **Interceptors**: Automatic token refresh on API calls

### 4. Media Management
- **Upload**: FormData with progress tracking
- **Storage**: Organized folder structure by type
- **Optimization**: Image compression and format conversion

## 🔄 Development Workflow

### 1. Starting Development
```bash
# Start all services
npm run dev          # Frontend (Terminal 1)
python manage.py runserver 8002  # Backend (Terminal 2)
fastapi dev main.py  # Microservices (Terminal 3)
```

### 2. Database Operations
```bash
# Migrations
python manage.py makemigrations
python manage.py migrate

# Seed data
python manage.py seed_db

# Admin access
python manage.py createsuperuser
```

### 3. Testing Approach
- **Frontend**: Component testing with user interactions
- **Backend**: API endpoint testing with authentication
- **Integration**: End-to-end user journey testing

## 🚀 Deployment Considerations

### 1. Environment Configuration
- **Frontend**: Next.js environment variables
- **Backend**: Django settings with production overrides
- **Microservices**: FastAPI configuration management

### 2. Static Files
- **Development**: Django serves media files
- **Production**: CDN or cloud storage recommended

### 3. Database
- **Development**: SQLite for simplicity
- **Production**: PostgreSQL recommended

## 🔍 Code Quality Standards

### 1. Frontend
- **Components**: Functional components with hooks
- **Styling**: Tailwind utility classes
- **File Organization**: Feature-based structure

### 2. Backend
- **Models**: Clear relationships and validation
- **Views**: Class-based views with proper permissions
- **Serializers**: Comprehensive data validation

### 3. Documentation
- **Comments**: Explain complex business logic
- **README**: Clear setup and usage instructions
- **API Docs**: Comprehensive endpoint documentation

---

This implementation guide serves as a reference for understanding the codebase architecture and development practices used in Artify Bharat.