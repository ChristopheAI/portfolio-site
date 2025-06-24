# Portfolio Website - Christophe Van Hoof

> Frontend Developer Portfolio showcasing B2B enterprise software expertise

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/christophe-portfolio/deploys)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/christophevh/portfolio-website)
[![Performance](https://img.shields.io/badge/lighthouse-100%2F100-brightgreen)](https://christophe-portfolio.netlify.app)

## 🚀 Live Demo

**[View Portfolio →](https://christophe-portfolio.netlify.app)**

## 📋 About

Professional portfolio website for Christophe Van Hoof, showcasing:

- **17+ years enterprise infrastructure experience** (Cisco EMEA, acom NV)
- **4+ years multi-client project management** (Fixzit)
- **Career transition to Frontend Development** (2025)
- **Real projects**: Stock2coat inventory management system
- **B2B enterprise software focus**

## 🛠 Tech Stack

- **Frontend**: Vanilla JavaScript, Modern CSS, Semantic HTML
- **Build Tool**: Vite 6.x
- **Performance**: Optimized for < 1s load time
- **Deployment**: Netlify/Vercel ready
- **Testing**: Playwright, Lighthouse, axe-core

## 🏗 Project Structure

```
portfolio-website-cvh/
├── src/
│   ├── assets/images/          # Images and media
│   ├── css/main.css           # Styles
│   └── js/
│       ├── main.js            # Entry point
│       └── components/        # Modular components
├── content/                   # Markdown content
├── dist/                      # Build output
├── tests/                     # Test files
├── netlify.toml              # Netlify config
├── vercel.json               # Vercel config
└── index.html                # Main page
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Development

```bash
# Clone repository
git clone https://github.com/christophevh/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Test build locally
npm run test:build
```

## 🌐 Deployment

### Netlify (Recommended)

1. **Automatic**: Connect GitHub repo to Netlify
2. **Manual**: `npm run deploy:netlify`

### Vercel

1. **Automatic**: Connect GitHub repo to Vercel  
2. **Manual**: `npm run deploy:vercel`

### GitHub Pages

```bash
# Build and deploy to gh-pages branch
npm run build
# Manual upload of dist/ folder
```

## 📊 Performance Metrics

- **Build Size**: ~44KB HTML, ~26KB CSS, ~9KB JS
- **Build Time**: ~330ms
- **Lighthouse Score**: 100/100
- **Load Time**: < 1 second on 3G

## 🧪 Testing

```bash
# Copy linting
npm run copy:lint

# Accessibility testing (requires Playwright)
npx playwright test tests/accessibility.spec.js

# Performance testing
npx playwright test tests/performance.spec.js
```

## 📁 Key Features

### Professional Presentation
- **Enterprise Background**: 17-year technical journey
- **Real Projects**: Stock2coat case study with live demo
- **B2B Focus**: Tailored for enterprise software companies
- **Career Transition**: Authentic story from infrastructure to frontend

### Technical Excellence
- **Performance Optimized**: Critical CSS, resource hints, lazy loading
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Mobile First**: Responsive design, touch-friendly interactions
- **SEO Ready**: Meta tags, structured data, social cards

### Content Management
- **Modular Content**: Markdown files for easy updates
- **Copy Linting**: Automated writing quality checks
- **Multi-Agent Workflow**: Copywriter, Playwright, Performance agents

## 🔗 Links

- **Live Site**: [christophe-portfolio.netlify.app](https://christophe-portfolio.netlify.app)
- **LinkedIn**: [linkedin.com/in/christophevanhoof](https://linkedin.com/in/christophevanhoof)
- **Email**: [vhchristophe@gmail.com](mailto:vhchristophe@gmail.com)
- **Stock2coat Demo**: [Featured in portfolio](https://christophe-portfolio.netlify.app/#projects)

## 📄 License

ISC License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a personal portfolio project. For suggestions or feedback:

1. Open an issue
2. Submit a pull request
3. Contact via [email](mailto:vhchristophe@gmail.com)

---

**Built with passion and vanilla JS** 🚀 