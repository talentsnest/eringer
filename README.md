# Eringer Switzerland - Premium Swiss Skincare Website

A luxury e-commerce website built with Next.js 14, React, TailwindCSS, and Framer Motion, showcasing premium Swiss skincare products with elegant animations and immersive user experience.

## ✨ Features

### Design & User Experience
- **Premium Design**: Minimalist aesthetic with gold accents and botanical green tones
- **Custom Cursor**: Magnetic effect on interactive elements with smooth animations
- **Micro-interactions**: Hover effects, smooth transitions, and delightful animations throughout
- **Parallax Effects**: Subtle parallax scrolling on hero images and backgrounds
- **Scroll Progress Bar**: Visual indicator of page scroll progress
- **Mobile-First**: Fully responsive design optimized for all devices

### Technical Features
- **Next.js 14**: Latest features including App Router and Server Components
- **TypeScript**: Type-safe development
- **Framer Motion**: Fluid animations and page transitions
- **TailwindCSS**: Utility-first styling with custom design tokens
- **Image Optimization**: WebP format support and lazy loading
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

### Pages
- **Home**: Hero section, best sellers, ingredients showcase, testimonials, blog preview
- **Shop**: Product catalog with filtering and animated product cards
- **About**: Brand story, values, and sustainability commitment
- **Blog**: Articles about skincare, ingredients, and tips
- **Contact**: Contact form with validation and multiple contact methods
- **FAQ**: Categorized frequently asked questions with accordion UI

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design System

### Colors
- **Gold**: Primary accent color for luxury feel (#d4ae7a - #c19865)
- **Botanical Green**: Nature-inspired accent (#659b5b and variations)
- **Neutral**: Clean whites and grays for background and text

### Typography
- **Headings**: Playfair Display (Serif) - Elegant and timeless
- **Body**: Inter (Sans-serif) - Clean and readable

### Animations
- **Page Transitions**: Smooth fade and slide effects
- **Scroll Animations**: Elements fade and slide in on scroll
- **Hover Effects**: Scale, shadow, and color transitions
- **Product Cards**: Image zoom and parallax on hover

## 📁 Project Structure

```
erdinger/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── blog/                # Blog listing
│   ├── contact/             # Contact form
│   ├── faq/                 # FAQ page
│   ├── shop/                # Product catalog
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with header/footer
│   └── page.tsx             # Home page
├── components/
│   ├── home/                # Home page sections
│   │   ├── HeroSection.tsx
│   │   ├── BestSellers.tsx
│   │   ├── IngredientsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── BlogSection.tsx
│   ├── layout/              # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── product/             # Product components
│   │   └── ProductCard.tsx
│   └── ui/                  # UI components
│       ├── CustomCursor.tsx
│       ├── ScrollProgress.tsx
│       └── PageTransition.tsx
├── public/                  # Static assets
├── tailwind.config.js       # TailwindCSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies

```

## 🎯 Key Components

### CustomCursor
Magnetic cursor that follows mouse movement and expands on hover over interactive elements.

### ProductCard
Animated product card with:
- Image parallax on hover
- Smooth overlay reveal
- Price and CTA button animation
- Badge support for "New" or "Best Seller"

### ScrollProgress
Thin progress bar at the top of the page showing scroll position.

### PageTransition
Smooth fade transitions between page navigations.

## 🔧 Customization

### Adding Products
Edit the product arrays in `/app/shop/page.tsx` and `/components/home/BestSellers.tsx`.

### Changing Colors
Modify the color palette in `tailwind.config.js`:
```js
colors: {
  gold: { ... },
  botanical: { ... }
}
```

### Adding Blog Posts
Add new blog post objects to the arrays in `/app/blog/page.tsx` and `/components/home/BlogSection.tsx`.

## 📱 Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License
This project is for demonstration purposes. All rights reserved.

## 🤝 Contact
For questions or support, contact: contact@eringerswitzerland.com

---

Built with ❤️ using Next.js, React, TailwindCSS, and Framer Motion

