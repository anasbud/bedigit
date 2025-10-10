# BeDigit Hackathon 2025 - Landing Page

Modern landing page built with Vite bundler for optimal performance.

## Features

- ✨ Single bundled JavaScript file (660KB from 22 separate libraries)
- 🚀 Vite for modern bundling and development
- 📦 All JavaScript libraries consolidated
- 🎨 CSS bundled and optimized
- 📱 Responsive design
- ⚡ Fast loading times

## Quick Start

### Development

```bash
npm install
npm run dev
```

During development, individual JavaScript files are loaded separately for easier debugging and faster hot-reload.

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory with all JavaScript concatenated into a single `bundle.min.js` file (660KB).

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── assets/           # Original assets (fonts, images, css, js)
├── src/
│   └── main.js      # Entry point (imports style.css)
├── dist/            # Production build output
│   ├── js/
│   │   └── bundle.min.js  # Single bundled JS file (660KB)
│   ├── css/
│   └── index.html
├── vite.config.js   # Vite configuration
├── bundle-scripts.js # Custom plugin to bundle all JS files
└── index.html       # Source HTML
```

## Bundled Libraries

The following 22 libraries are bundled into a single `bundle.min.js` file:

1. jQuery 3.7.1
2. Bootstrap Bundle
3. jQuery Appear
4. Swiper Bundle
5. Progress Bar
6. Circle Progress
7. WOW.js
8. Isotope
9. ImagesLoaded
10. Magnific Popup
11. Waypoints
12. Effect Slicer
13. Count To
14. ScrollOnReveal
15. ScrollSmoother
16. YT Player
17. Validnavs
18. GSAP
19. ScrollTrigger
20. SplitText
21. Main scripts
22. GSAP initialization

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run serve` - Serve production build on network

## Publishing to npm

To publish this package to npm:

```bash
npm run build
npm publish
```

## Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0

## Fonctionnalités

- Design moderne avec animations GSAP
- Présentation des 5 projets du hackathon
- Formulaire de sélection du top 3 des projets
- Responsive design
- Animations fluides et smooth scrolling

## License

MIT
