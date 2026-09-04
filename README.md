# 1Fi SDE Intern Assignment: 1Fi Marketplace

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-purple.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0+-646CFF.svg)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Status-Completed-success.svg)]()

> A production-grade implementation of the **1Fi Marketplace** section within the **Shop** page of the 1Fi application, designed to faithfully mirror 1Fi's fintech design system, Loan Against Mutual Funds (LAMF) checkout financing model, and user experience.

---

## 📌 Project Overview

**1Fi (Fiquity Technology)** is India’s first mutual fund-backed checkout financing platform. Instead of high-interest unsecured loans or credit cards requiring CIBIL scores, 1Fi allows users to finance everyday gadgets and electronics at **0% interest EMIs** by digitally pledging mutual fund units (via CAMS / KFintech / MFCentral). The user's mutual funds remain 100% invested and continue compounding (e.g. ~14% CAGR), effectively making purchases cheaper than paying upfront with cash.

This repository implements the **1Fi Marketplace** section within the **Shop** experience, meeting all functional, architectural, and design consistency requirements set out in the SDE Intern assignment.

---

## 🚀 Key Features

### 1. Shop Page Navigation (All 3 Options Fully Functional!)
While the initial assignment specified that *Top Brands* and *Nearby Stores* could remain blank placeholders, **all three options have been fully designed and implemented** to deliver a standout, comprehensive shopping experience:
- **Top Brands (D2C Brand Portal)**: Browse official brand partners (Apple, Samsung, Croma, Reliance Digital, boAt, OnePlus, Sony, Dyson) with brand offers, instant 1Fi Virtual Card limit allocation, and direct voucher redemption.
- **Nearby Stores (Offline Retail & In-Store POS)**: Interactive store finder with GPS geolocation / pincode search, real-time operating hours, directions, and an instant in-store counter checkout modal generating dynamic merchant authorization QR codes.
- **1Fi Marketplace (Flagship eCommerce Experience)**: Complete online marketplace with comprehensive product catalog, variant selectors, multi-tenure EMI calculations with mutual fund compounding savings, and simulated CAMS/KFintech lien pledge checkout.

### 2. 1Fi Marketplace Catalog
- **Instant Search**: Real-time search across product names, brands, and categories.
- **Category Filter Pills**: Filter by `All`, `Phones`, `Laptops`, `Audio`, `Wearables`, and `Tablets`.
- **Dynamic Sorting**: Sort by `Featured / Best Sellers`, `Lowest Monthly EMI`, `Price: Low to High`, and `Price: High to Low`.
- **Product Cards**: Includes product image, brand badges, pricing, discount percentages, lowest 0% EMI callout, required mutual fund pledge amount, and delivery estimates.

### 3. Product Detail Page (PDP Modal)
- **High-Res Gallery**: Clickable image gallery with thumbnail preview switcher.
- **Interactive Variant Selectors**:
  - Color Swatches: Live visual swatches with active selection state (e.g., *Desert Titanium*, *Space Black*).
  - Storage / RAM Options: Reactive selection that dynamically updates price, installment schedules, and collateral requirements.
- **Technical Specs**: Collapsible accordion covering Display, Chipset, Camera, and Battery.
- **1Fi Value Guarantees**: 100% Genuine, 1-Year Brand Warranty, 7-Day Hassle-free replacement.

### 4. EMI Engine & Compounding Calculator
- **Interactive Tenure Cards**: 3, 6, 9, 12 Months (**0% No-Cost EMI**) and 24 Months options.
- **Down Payment Slider**: Adjust from `₹0 Down` up to 50% with quick percentage shortcuts.
- **The 1Fi Advantage Card**: Demonstrates how keeping mutual funds invested at ~14% CAGR yields significant wealth growth compared to liquidating investments or paying upfront cash.
- **Transparent Fee Summary**: Zero processing fee and zero foreclosure charges.

### 5. Multi-Step Checkout & Pledge Flow
- **Step 1 - Review**: Order breakdown, variant verification, and delivery address.
- **Step 2 - Digital Lien Pledge Simulation**: Verified mutual fund portfolio selection (CAMS / KFintech) with 256-bit encryption guarantee.
- **Step 3 - Celebratory Confirmation**: Confetti celebration, official Order ID (`1FI-ORD-XXXXXX`), pledge reference, and monthly repayment calendar.

### 6. Full-Screen Responsive Web App & Mobile App Experience
- **Laptop / Web Window**: The app covers the full width of the screen (`max-w-7xl mx-auto`), featuring top desktop navigation bar (`Home`, `Shop`, `EMI Dues`, `Limit`, `Profile`), 4-column product grid (`lg:grid-cols-4`), 3-4 column brand/store grids, rich split hero banner with live portfolio credit line statistics, and an expansive 2-column desktop product detail modal (`md:grid-cols-12`).
- **Mobile View**: On mobile devices (`< 768px`), the interface smoothly adapts to the authentic 1Fi mobile app layout, featuring floating bottom navigation with purple radial glow, compact touch cards, and native mobile gestures.
- **Phone Simulator Toggle**: Click *"Phone Simulator"* in the header on desktop to preview the mobile app experience within an interactive iPhone 16 mockup frame.

### 7. Official 1Fi Landing Home Page
- **Exact Match to 1fi.in Hero**: Features the official headline *"Shop today / Pay later using / mutual funds."*, interactive *"Check Eligibility ↗"* and *"Start Shopping 🔍"* buttons, and investment value captions.
- **3-Column Curated Product Showcase**: Features *Featured Products* (Google Pixel 10 & iPhone 17), *Best Sellers* (iPhone 17 Pro Max & Galaxy S25 Ultra), and *Best Deals* (MacBook Pro & OnePlus 15) in 1Fi signature soft lavender cards (`#EFDAFF`) with instant navigation to Marketplace.
- **Interactive Credit Limit Estimator Modal**: Interactive slider calculating instant 80% LTV credit limits, monthly 0% purchasing power, and ~14% CAGR compounding returns.
- **"How It Works in 4 Steps" & "Key Benefits"**: Complete overview of 1Fi's institutional security, 0% interest, and instant digital lien approval process.

---

## 🛠️ Architecture & Tech Stack

```
src/
├── types/
│   ├── product.ts          # Strongly typed product & variant models
│   ├── emi.ts              # Strongly typed EMI plans, pledges & orders
│   └── store.ts            # Top brand partner & nearby store models
├── services/
│   ├── mockData.ts         # Catalog, Top Brands, and Nearby Store partners data
│   └── api.ts              # Decoupled async API layer with latency simulation
├── hooks/
│   ├── useProducts.ts      # Search, filter, sorting, loading & error state management
│   └── useEMIPlan.ts       # Reactive EMI calculations & down payment logic
├── components/
│   ├── layout/
│   │   ├── AppHeader.tsx   # 1Fi branding, credit limit & simulator view toggle
│   │   ├── BottomNav.tsx   # Floating bottom navigation with 1Fi purple glow
│   │   └── DeviceFrame.tsx # Mobile phone simulator container
│   ├── shop/
│   │   ├── ShopTabs.tsx         # 3-tab segmented control
│   │   ├── TopBrandsView.tsx    # D2C brands & 1Fi Instant Virtual Card generator
│   │   ├── NearbyStoresView.tsx # Local retail partner finder & in-store POS QR checkout
│   │   └── ShopPage.tsx         # Main Shop coordinator component
│   ├── marketplace/
│   │   ├── SearchBar.tsx
│   │   ├── CategoryFilters.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── ProductSkeleton.tsx # Shimmer loaders
│   ├── pdp/
│   │   └── ProductDetailModal.tsx # PDP modal with dynamic variant switching
│   ├── emi/
│   │   ├── EMIPlanSelector.tsx
│   │   ├── EMIPlanCard.tsx
│   │   └── MutualFundBenefitCard.tsx # Compounding returns calculator
│   └── checkout/
│       └── CheckoutModal.tsx   # Checkout & CAMS pledge simulation
├── utils/
│   └── formatters.ts       # Indian currency formatters (₹) & EMI math
├── App.tsx                 # Root app
└── main.tsx                # Entry point
```

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/khatrisomay/SDE-Intern-Assignment-1Fi.git
   cd SDE-Intern-Assignment-1Fi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚀 Deployment on Render

This project includes a native `render.yaml` Blueprint specification for 1-click deployment on [Render](https://render.com).

### Option 1: Static Site on Render (Recommended, Free, Instant Worldwide CDN)
1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **"New +"** ➔ **"Static Site"**.
3. Connect repository: `https://github.com/khatrisomay/SDE-Intern-Assignment-1Fi.git`.
4. Configure settings:
   - **Name**: `1fi-marketplace`
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click **"Create Static Site"**.
6. Under **Settings ➔ Redirects/Rewrites**, ensure SPA routing rewrite rule:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`

### Option 2: Render Blueprint (1-Click Automated)
1. In Render, click **"New +"** ➔ **"Blueprint"**.
2. Connect `https://github.com/khatrisomay/SDE-Intern-Assignment-1Fi.git`.
3. Render will read `render.yaml` and configure the build and rewrite routes automatically!

---

## 🎨 UI/UX Design System

- **Primary Color**: `#712CDC` (1Fi Signature Purple)
- **Gradients**: `linear-gradient(to tr, #6C28D9, #8232e8, #9e4dfc)`
- **Lavender Tints**: `#f5f0ff`, `#ece5ff`, `#ede8ff`
- **Typography**: Inter / Geist Sans with crisp weights (Medium, Semibold, Bold, Black)
- **Animations**: Shimmer skeletons, smooth bottom-sheet modals, and celebratory confetti

---

## 📋 Evaluation Criteria Self-Assessment

| Criterion | Implementation |
| :--- | :--- |
| **Product Understanding** | Accurately models 1Fi's Loan Against Mutual Funds (LAMF) value proposition, showing how compounding mutual funds outweigh upfront cash purchases. |
| **UI/UX Consistency** | Inspected live 1Fi app (`1fi.in` and `app.1fi.in`) to replicate exact colors (`#712CDC`), tab styling, bottom navigation, and typography. |
| **Engineering Quality** | Strict TypeScript typings, decoupled mock API services, custom hooks, reusable components, and zero TypeScript/bundler errors. |
| **Functionality** | Complete end-to-end journey from browsing and filtering to variant selection, EMI calculation, and simulated pledge confirmation. |
| **Data / API Handling** | Realistic asynchronous data retrieval with latency simulation, loading shimmer skeletons, and error handling with retry capability. |
| **Attention to Detail** | Debounced search, reactive price updates, down payment slider, mobile phone mockup toggle, and confetti animations.
