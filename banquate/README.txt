========================================================================
 BOU THAKURANI BANQUET - PREMIUM LUXURY EVENT MANAGEMENT WEBSITE FRONTEND
========================================================================

A modern, luxurious, premium-quality, fully responsive static HTML5 website
frontend built for Bou Thakurani Banquet in Madhyamgram, Kolkata.

Designed for direct static hosting (Hostinger, cPanel, Apache, GoDaddy, etc.)
without any command line build steps, compilation, database, or backend setup.

------------------------------------------------------------------------
FOLDER STRUCTURE
------------------------------------------------------------------------
banquet-website/
│
├── index.html           # Landing page (with Swiper slider, welcome, categories, video tour, reviews)
├── about.html           # Heritage, milestones, team profiles, and FAQs
├── services.html        # Detailed event hostings grid, Cost Estimator, and Custom Menu Builder
├── gallery.html         # Media gallery with custom filters and GLightbox
├── contact.html         # Google map integration, contact cards, and validation contact form
│
├── assets/
│   ├── css/
│   │   ├── style.css       # Core layout structure, premium typography, colors, animations
│   │   └── responsive.css  # Extracted CSS media queries for full mobile/tablet responsiveness
│   │
│   ├── js/
│   │   └── script.js       # Core vanilla JS: sticky navbar, calculator, custom cursor, Swiper/AOS setup
│   │
│   ├── images/
│   │   ├── hero/           # Carousel banners
│   │   ├── gallery/        # Lightbox showcase photos
│   │   ├── services/       # Event service cards
│   │   ├── about/          # Welcome images, leadership profiles, reviewer avatars
│   │   ├── logo/           # Logo assets
│   │   └── icons/          # Specialty indicators
│   │
│   └── fonts/              # Custom fonts folder
│
├── favicon.ico          # Web page icon
│
└── README.txt           # Setup and deployment instructions (this file)

------------------------------------------------------------------------
LIBRARIES & CDNS INTEGRATED (Static CDNs - No Local Node Packages Required)
------------------------------------------------------------------------
1. Bootstrap 5.3.3 (CSS & JS bundle) - Responsive grid, utility layout, modals, and dropdowns.
2. Bootstrap Icons 1.11.3 - Scalable theme icons.
3. Swiper.js 11 - Premium fade hero slider and touch-enabled testimonial slider.
4. GLightbox 3.3.0 - Elegant lightbox popups for high-res images and virtual video tours.
5. CountUp.js 2.6.0 - High-performance number counter animations.
6. AOS (Animate On Scroll) 2.3.1 - Smooth fade and zoom transitions triggered by page scroll.

------------------------------------------------------------------------
HOW TO RUN LOCALLY
------------------------------------------------------------------------
Option A: Simply double-click "index.html" in any web browser.
Option B: Run a simple local web server in the directory.
   - For example, using Python:
     python -m http.server 8000
     Then visit http://localhost:8000 in your browser.
   - Or using Node:
     npx http-server
     Then visit http://localhost:8080 in your browser.

------------------------------------------------------------------------
HOW TO DEPLOY TO PRODUCTION (Hostinger / cPanel / Apache Hosting)
------------------------------------------------------------------------
1. Compress the entire contents of the root folder (containing the HTML files and the assets/ folder) into a single ZIP file.
2. Log in to your Hostinger hPanel or cPanel File Manager.
3. Navigate to the "public_html" directory.
4. Upload the ZIP file.
5. Extract the ZIP file directly inside "public_html".
6. Ensure that the HTML files (index.html, about.html, etc.) are in the root of the "public_html" directory.
7. The website will immediately be live and functional at your domain name.

------------------------------------------------------------------------
KEY INTERACTIVE FEATURES IMPLEMENTED
------------------------------------------------------------------------
1. Elegant Sticky Navbar with dynamic background blur (glassmorphism) and active highlights.
2. Immersive Ken Burns fade slider in Hero section.
3. Dynamic Budget Estimator & Event Cost Calculator on services page with instant receipt preview.
4. Custom Food Menu Builder with clipboard copy and booking modal attachment capabilities.
5. Seamless contact form validations compiling user responses directly to WhatsApp API messages.
6. Cinematic video tour opening in lightboxes without page reloads.
7. Smooth custom gold cursor follower for premium aesthetic desktop navigation (disabled on touch).
========================================================================
