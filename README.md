# NEXU eCommerce Platform

NEXU is a modern eCommerce platform built with Laravel, Inertia.js, React, and TypeScript. It features a clean, minimalist design with a focus on user experience and performance.

![NEXU eCommerce Platform](https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop)

## 📋 Features

- **Modern UI/UX Design**: Clean, responsive interface built with React and Tailwind CSS
- **Product Catalog**: Browse products with filtering and search capabilities
- **Product Details**: View detailed product information, specifications, and reviews
- **Product Options**: Select different variants such as size, color, or other attributes
- **Category Navigation**: Browse products by category
- **Promotional Slides**: Showcase special offers and promotions
- **User Authentication**: Register, login, and manage user accounts
- **Responsive Design**: Optimized for all device sizes

## 🛠️ Tech Stack

- **Backend**:
  - Laravel 12
  - Postgres
  - PHP 8.2

- **Frontend**:
  - Inertia.js
  - React
  - TypeScript
  - Tailwind CSS
  - React Hooks
  - Radix UI Components

## 🚀 Getting Started

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js (v18+) and npm/yarn
- Postgres

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/codewithwan/eCommerce-Laravel.git
   cd eCommerce-Laravel
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install JavaScript dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

4. Copy the environment file and configure your database:
   ```bash
   cp .env.example .env
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Run migrations and seed the database:
   ```bash
   php artisan migrate --seed
   ```

7. Build assets:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

8. Start the development server:
   ```bash
   php artisan serve
   ```

Visit `http://localhost:8000` to see the application running.

## 📂 Project Structure

The project follows a standard Laravel structure with Inertia.js and React:

- `app/` - Contains Laravel PHP code
- `resources/js/` - Contains React components and TypeScript code
  - `components/` - Reusable UI components
  - `layouts/` - Page layouts and structures
  - `pages/` - Inertia page components
  - `data/` - Mock data and types

## 🧩 Key Components

### Product Display

- `ProductCard`: Card component displaying product preview
- `ProductGrid`: Grid layout for displaying multiple products
- `ProductImageGallery`: Image gallery with thumbnails for product details
- `ProductInfo`: Product information component with add-to-cart functionality
- `ProductTabs`: Tabbed interface for product description, specifications, and reviews

### UI Components

- `SiteHeader`: Main navigation header
- `SiteFooter`: Footer with site information
- `PromotionalSlider`: Carousel for promotional content
- `TrustIndicators`: Trust badges and indicators

## 🔄 Current State

This project is currently using mock data for demonstration purposes. In a production environment, you would:

1. Connect to a real database
2. Implement full shopping cart functionality
3. Set up payment gateway integration
4. Implement order management
5. Add admin dashboard for product management

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- UI inspiration from various minimal eCommerce platforms
- Images from [Unsplash](https://unsplash.com)
