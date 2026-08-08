# HitroBro.github.io — Astro Portfolio

[![Astro](https://img.shields.io/badge/Astro-4.x-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?style=for-the-badge&logo=github&logoColor=white)](https://github.com/HitroBro/HitroBro.github.io/settings/pages)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Modern static portfolio for Hitarth Ghia — Cyber Security Student (CoE) | Network Engineering & Security Automation**

---

## 🚀 Live Demo

**[https://HitroBro.github.io](https://HitroBro.github.io)**

---

## 📋 Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, stats, featured projects, demos preview, contact |
| `/projects/` | Project index with case study links |
| `/projects/async-tcp-gateway/` | Deep-dive: epoll TCP gateway architecture |
| `/projects/neosahre/` | Deep-dive: Zero-dep HTTP server (NeoShare) |
| `/blog/` | Technical blog index (7 posts) |
| `/demos/` | Interactive demos hub |
| `/demos/subnet-calculator/` | IPv4/IPv6 subnet calculator with binary viz |
| `/demos/packet-header-viz/` | Ethernet/IPv4/TCP/UDP header visualizer + PCAP export |
| `/demos/tcp-state-machine/` | RFC 793 TCP state diagram with animations |
| `/rss.xml` | Auto-generated RSS feed |

---

## 🛠 Tech Stack

- **Framework**: [Astro 4](https://astro.build) — Zero-JS-by-default, island architecture
- **Styling**: Custom CSS with CSS Variables, dark/light auto-detection
- **Fonts**: IBM Plex Sans + JetBrains Mono (Google Fonts)
- **Interactivity**: Vanilla JS (no framework) for demos
- **Deployment**: GitHub Pages (static export)

---

## 🏃 Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── layouts/
│   └── BaseLayout.astro      # Root layout (SEO, header, footer, JSON-LD)
├── pages/
│   ├── index.astro           # Home page
│   ├── 404.astro             # Custom 404
│   ├── rss.xml.astro         # RSS feed generator
│   ├── projects/
│   │   ├── index.astro       # Projects listing
│   │   ├── async-tcp-gateway.astro
│   │   └── neosahre.astro
│   ├── blog/
│   │   └── index.astro       # Blog index (add .md files for posts)
│   └── demos/
│       ├── index.astro       # Demos hub
│       ├── subnet-calculator.astro
│       ├── packet-header-viz.astro
│       └── tcp-state-machine.astro
├── styles/
│   └── global.css            # Design system (variables, components, utilities)
└── env.d.ts                  # TypeScript declarations
public/
├── favicon.svg
└── site.webmanifest
astro.config.mjs              # Astro config (site, base, trailingSlash)
package.json
```

---

## ✨ Features

- **Performance**: Static HTML, no client JS by default, optimized assets
- **SEO**: Open Graph, Twitter Cards, JSON-LD Person/BlogPosting, sitemap-ready
- **Accessibility**: Semantic HTML, focus-visible, reduced-motion support
- **Interactive Demos**:
  - Subnet Calculator: CIDR, binary viz, classful ref, IPv4/IPv6
  - Packet Visualizer: Live checksum, field editing, PCAP download
  - TCP State Machine: RFC 793 diagram, animated transitions, event log
- **Theme**: Dark mode default, auto light mode via `prefers-color-scheme`
- **Responsive**: Mobile-first, fluid typography with `clamp()`

---

## 🔧 Customization

### Colors (CSS Variables in `src/styles/global.css`)
```css
:root {
  --accent-primary: #00d47e;   /* Cyberpunk green */
  --accent-secondary: #ff3d71;  /* Accent pink */
  --accent-warning: #ffb800;    /* Warning amber */
  --accent-info: #00b4ff;       /* Info blue */
}
```

### Contact Form
Edit `src/pages/index.astro` → replace Formspree endpoint:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', { ... })
```

### Blog Posts
Add `.astro` or `.md` files in `src/pages/blog/` — they'll auto-appear in the index.

---

## 📦 Deployment

1. **Enable GitHub Pages**:
   - Repo Settings → Pages → Source: `Deploy from a branch`
   - Branch: `main` / Folder: `/ (root)` → **Save**
   - (Astro outputs to `dist/` but GitHub Pages serves from repo root)

2. **Or use GitHub Actions** (recommended):
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with: { node-version: 20, cache: npm }
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

---

## 📄 License

MIT License — See [LICENSE](LICENSE) for details.

---

## 👤 Author

**Hitarth Ghia**  
Cyber Security Student (CoE Track) @ Parul University  
[GitHub](https://github.com/HitroBro) • [LinkedIn](https://linkedin.com/in/hitarth-ghia) • [Email](mailto:ghiahitarth@gmail.com)