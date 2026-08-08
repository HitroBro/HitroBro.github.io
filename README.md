# HitroBro.github.io — Pelican Portfolio

[![Pelican](https://img.shields.io/badge/Pelican-4.x-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://getpelican.com)
[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
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
| `/archives/` | All posts by year |
| `/categories.html` | Posts by category |
| `/tags.html` | Posts by tag |
| `/feeds/all.atom.xml` | RSS/Atom feed |

---

## 🛠 Tech Stack

- **Generator**: [Pelican 4](https://getpelican.com) — Python-based static site generator
- **Templates**: Jinja2 — familiar Python templating
- **Styling**: Custom CSS with CSS Variables, dark/light auto-detection
- **Fonts**: IBM Plex Sans + JetBrains Mono (Google Fonts)
- **Interactivity**: Vanilla JS (no framework) for demos
- **Deployment**: GitHub Pages via GitHub Actions

---

## 🏃 Local Development

```bash
# Install dependencies (one-time)
pip install pelican markdown pelican-sitemap pelican-neighbors pelican-related-posts --break-system-packages

# Build site (outputs to repo root for GitHub Pages)
pelican -s pelicanconf.py

# Serve locally for development (http://localhost:8000)
pelican -l -s pelicanconf.py

# Or use the dev server with auto-reload
pelican -r -s pelicanconf.py
```

---

## 📁 Project Structure

```
HitroBro.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── content/
│   └── extra/
│       └── favicon.svg         # Copied to root on build
├── output/                     # Pelican output (gitignored in normal use)
├── pelicanconf.py              # Pelican configuration
├── themes/
│   └── hitrobro/
│       ├── static/
│       │   ├── css/
│       │   │   └── main.css    # Design system
│       │   └── images/
│       │       └── favicon.svg
│       └── templates/
│           ├── base.html       # Root layout (SEO, header, footer)
│           ├── index.html      # Home page
│           ├── projects.html   # Projects index
│           ├── blog.html       # Blog index
│           ├── demos.html      # Demos hub
│           ├── subnet-calculator.html
│           ├── packet-header-viz.html
│           ├── tcp-state-machine.html
│           ├── 404.html        # Custom 404
│           ├── categories.html
│           ├── tags.html
│           ├── archives.html
│           └── feeds/
│               └── all.atom.xml
├── index.html                  # Built output (GitHub Pages serves from root)
├── projects/
│   └── index.html
├── blog/
│   └── index.html
├── demos/
│   ├── index.html
│   ├── subnet-calculator.html
│   ├── packet-header-viz.html
│   └── tcp-state-machine.html
├── archives/
│   └── index.html
├── feeds/
│   └── all.atom.xml
├── favicon.svg
├── sitemap.xml
├── pelicanconf.py
└── pelicanconf.pyc
```

---

## ✨ Features

- **Performance**: Static HTML, no client JS by default, optimized assets
- **SEO**: Open Graph, Twitter Cards, JSON-LD Person/BlogPosting, sitemap.xml, RSS feed
- **Accessibility**: Semantic HTML, focus-visible, reduced-motion support
- **Interactive Demos** (vanilla JS):
  - **Subnet Calculator**: CIDR, binary viz, classful reference, IPv4/IPv6
  - **Packet Header Visualizer**: Live checksum, field editing, PCAP export
  - **TCP State Machine**: RFC 793 diagram, animated transitions, event log
- **Theme**: Dark mode default, auto light mode via `prefers-color-scheme`
- **Responsive**: Mobile-first, fluid typography with `clamp()`
- **Zero-JS Core**: All pages work without JavaScript (progressive enhancement)

---

## 🔧 Customization

### Colors (CSS Variables in `themes/hitrobro/static/css/main.css`)
```css
:root {
  --accent-primary: #00d47e;   /* Cyberpunk green */
  --accent-secondary: #ff3d71;  /* Accent pink */
  --accent-warning: #ffb800;    /* Warning amber */
  --accent-info: #00b4ff;       /* Info blue */
}
```

### Contact Form
Edit `themes/hitrobro/templates/index.html` → replace Formspree endpoint:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', { ... })
```

### Profile & Projects
Edit `pelicanconf.py`:
- `PROFILE` dict — bio, skills, current focus
- `FEATURED_PROJECTS` list — homepage project cards
- `DEMOS` list — interactive demo cards

### Add Blog Posts
Create `.md` files in `content/blog/`:
```markdown
Title: My Post Title
Date: 2025-08-08
Category: Networking
Tags: epoll, C, Linux

Post content here...
```

---

## 📦 Deployment

### Automatic (GitHub Actions)
1. **Enable GitHub Pages**:
   - Repo Settings → Pages → Source: **GitHub Actions**
2. Push to `main` → workflow builds with Pelican → deploys automatically

### Manual
```bash
pelican -s pelicanconf.py
git add -A && git commit -m "Deploy" && git push
```

---

## 📄 License

MIT License — See [LICENSE](LICENSE) for details.

---

## 👤 Author

**Hitarth Ghia**  
Cyber Security Student (CoE Track) @ Parul University  
[GitHub](https://github.com/HitroBro) • [LinkedIn](https://linkedin.com/in/hitarth-ghia) • [Email](mailto:ghiahitarth@gmail.com)