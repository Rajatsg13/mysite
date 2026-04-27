# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static single-page marketing site for GrowBiz Consulting (www.growbiz.consulting). No build step, no package manager, no framework — just `index.html`, `style.css`, and `script.js`.

## Local Development

Open `index.html` directly in a browser, or serve it with any static server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

## Deployment

Pushing to `main` automatically deploys via the GitHub Actions workflow (`.github/workflows/deploy.yml`), which uses `peaceiris/actions-gh-pages` to publish the repo root to GitHub Pages. The `CNAME` file sets the custom domain — do not delete or rename it.

## Architecture

Single HTML file with inline section IDs used for anchor navigation (`#services`, `#process`, `#case-study`, `#about`, `#contact`). The navbar and footer both render links to these anchors. `script.js` handles smooth scroll for all `a[href^="#"]` links.

### CSS notes

- `style.css` contains some dead/unused rules: `.hero.premium` (HTML uses `.hero` without `.premium`), `body.dark` dark-mode overrides (no toggle exists in JS), and `.problems ul` / `.model ul` / `.network ul` (these sections use `div`-based layouts in the current HTML, not `ul`).
- Layout uses `max-width: 1000px; margin: auto` on `section` for content width. The navbar uses `padding: 0 8%` instead.
- Responsive breakpoint is at `768px` (mobile).
