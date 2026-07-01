# Artisan Dashboard Redesign Specification

- **Date**: 2026-06-30
- **Status**: Draft
- **Target Files**:
  - `frontend/pages/artisan/dashboard.js`
  - `frontend/components/artisan/AddProductModal.js`
  - `frontend/components/artisan/ProductDetailModal.js`
  - `frontend/components/artisan/EditProfileModal.js`
  - `frontend/components/artisan/EnhancedProgressRow.js`
  - `frontend/components/artisan/EnhancedActivityItem.js`
  - Deleting `frontend/pages/artisan/dashboard_backup.js`

## 1. Overview
The current artisan dashboard has major layout and functionality helper components commented out, causing compile and run-time issues. In addition, the routing folder contains a backup page `dashboard_backup.js` without a default React export, failing production Next.js builds.

This specification details a complete refactoring of the artisan dashboard:
1. Deleting the broken backup file.
2. Modularizing the main routing page (`dashboard.js`) by splitting all modal screens and minor layout helpers into separate component files.
3. Enabling key interactive features: 360° product rotation view, voice-to-text audio transcription for product description generation, profile edits, and verification flows.

## 2. File Architecture

```
frontend/
├── components/
│   └── artisan/
│       ├── AddProductModal.js
│       ├── ProductDetailModal.js
│       ├── EditProfileModal.js
│       ├── EnhancedProgressRow.js
│       └── EnhancedActivityItem.js
└── pages/
    └── artisan/
        └── dashboard.js  (Main entry page, holds core state)
```

## 3. Component Details

### A. Main Dashboard Page (`frontend/pages/artisan/dashboard.js`)
* **State Management**:
  * `data`: Dashboard stats (sales, products count, active orders, verification status).
  * `change`: Dashboard stats relative change.
  * `artisanData`: Title, profile image, location, experience, craft story, and specialty.
  * `products`: List of artisan's products.
  * Modals toggles: `showAddProduct`, `selectedProduct`, `showEditProfile`.
* **Hooks**:
  * On load, queries JWT token, fetches dashboard stats, products, and artisan profile.
  * Listens to verification queries in URL to display success notifications.
* **UI**:
  * Glassmorphism layout header and background grids.
  * Renders `EnhancedProgressRow` for performance metrics.
  * Renders `EnhancedActivityItem` for recent events list.
  * Renders corresponding modal files conditionally.

### B. `AddProductModal.js`
* **Form Inputs**:
  * Product Title (required)
  * Category (required, dropdown list)
  * Unit Price (required, number)
  * Main Image (required, file picker with preview)
  * Product Video (optional, file picker with preview player)
  * Additional Images (optional, multiple files picker with previews and option to remove items)
* **Voice Recording Feature**:
  * Uses `MediaRecorder` API to capture audio chunks.
  * Displays "Record / Stop Recording" state cleanly.
  * Sends WebM audio file via POST `multipart/form-data` to local FastAPI endpoint (`http://localhost:8001/process_product_description`).
  * Inserts return text transcript automatically into Description textarea.
* **Submission**:
  * Appends form fields to `FormData`.
  * Calls `createProduct(data)` API method.
  * Reloads/updates parent product list upon success.

### C. `ProductDetailModal.js`
* **Image Gallery & Zoom**:
  * Displays product image with hover/click scale zoom interaction.
  * Key navigation support (Left/Right arrow keys for switching images).
* **360° View Mode**:
  * Accessible if the product has multiple images.
  * Drag handlers (`onMouseDown`, `onMouseMove`, `onMouseUp`) map client delta changes to rotating the image index.
  * Auto-rotate mode plays through the image gallery at 50ms intervals when idle.
* **Video Player**: Rendered inline if a video showcase exists.
* **Artisan Info**: Displays category, price, and author fields.

### D. `EditProfileModal.js`
* **Inputs**: Speciality, Experience (years), Bio, Craft Story.
* **Submission**:
  * Calls `api.patch("store/artisan/profile/", formData)` to save.
  * Triggers callback `onUpdate` to fetch fresh profile data in parent component, then closes modal.

### E. Minor Layout Components
* `EnhancedProgressRow`: Implements a progress bar with a shimmer animation styling for views/clicks metrics.
* `EnhancedActivityItem`: Renders activity items with color variants depending on success, info, neutral, or warning types.

## 4. Error Handling & Validation
* If API endpoints fail, UI falls back to mock states gracefully or prints developer logs.
* Form submissions require validation (prices > 0, required fields filled).
* Protected Route wrapper handles role verification (`artisan` required).
