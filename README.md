# Jolin A - Personal Portfolio Website

A fast, responsive, and accessible personal portfolio website built with clean, modern, pure semantic **HTML5**, **CSS3**, and vanilla **JavaScript**. No external frameworks, build tools, or third-party libraries required.

---

## 🌟 Highlights

- **Pure Vanilla Stack**: 100% dependency-free (zero npm packages, no React/Vue, no Bootstrap/Tailwind, no jQuery).
- **Responsive Layout**: Designed mobile-first, tested and verified across **375px (Mobile)**, **768px (Tablet)**, and **1280px+ (Desktop)** with fluid Flexbox and CSS Grid.
- **Dark / Light Mode**: Dynamic theme switcher defaulting to system color preference and persisting user choice via `localStorage`.
- **Accessible & Semantic**: Structured with semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), ARIA attributes, skip-to-content link, keyboard focus states, and `prefers-reduced-motion` compliance.
- **5 Core JavaScript Interactions**:
  1. Responsive mobile hamburger drawer menu with auto-close on link click or outside tap.
  2. Dark/Light mode toggle with persistence and system preference detection.
  3. Smooth scrolling and active navigation link indicator via `IntersectionObserver`.
  4. Fade-in on scroll animations via `IntersectionObserver`.
  5. Interactive project category filtering (`All`, `Full-Stack`, `AI`, `3D-Web`).

---

## 🛠️ Technologies Used

- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<time>`), accessible SVG icons, and ARIA labels.
- **CSS3**: Custom properties (CSS variables), Grid & Flexbox, smooth transitions, mobile-first media queries, and dark/light color themes.
- **JavaScript (ES6+)**: Pure Vanilla JS, `IntersectionObserver` API, `matchMedia` API, `localStorage` API (wrapped in `try/catch`), and DOM manipulation.

---

## 📂 Project Structure

```text
Portfolio/
├── index.html       # Semantic HTML5 layout and structure
├── style.css        # Responsive mobile-first CSS styling and theming
├── script.js        # Vanilla JS logic for nav, themes, filters, and animations
├── resume.pdf       # Resume file downloaded by the hero button
└── README.md        # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Launch
Simply double-click `index.html` or drag and drop it into any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

### Option 2: Using VS Code Live Server (Recommended)
1. Open **Visual Studio Code**.
2. Open the project folder: `File` → `Open Folder...` → select `Portfolio`.
3. If you haven't installed it yet, install the **Live Server** extension (by Ritwick Dey) from the VS Code Extensions tab (`Ctrl+Shift+X` or `Cmd+Shift+X`).
4. Right-click on `index.html` in the file explorer and click **"Open with Live Server"** (or click **"Go Live"** in the bottom status bar).
5. The portfolio will automatically open at `http://127.0.0.1:5500/index.html` with automatic hot-reloading on save.

---

## 🌐 How to Deploy on GitHub Pages

1. **Initialize Git and Commit**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: personal portfolio website"
   ```

2. **Push to GitHub**:
   - Create a new public repository on [GitHub](https://github.com) named `portfolio` (or `jolin181.github.io`).
   - Link your local repository and push:
     ```bash
     git remote add origin https://github.com/jolin181/<repository-name>.git
     git branch -M main
     git push -u origin main
     ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click on **Settings** → **Pages** (under the "Code and automation" section).
   - Under **Build and deployment** → **Source**, select **Deploy from a branch**.
   - Under **Branch**, choose `main` and folder `/ (root)`, then click **Save**.
   - After 1-2 minutes, GitHub will provide your live URL (e.g., `https://jolin181.github.io/<repository-name>/`).

---

## 📝 Customization Tips

- **Adding Live URLs**: In `index.html`, replace `href="#"` in the project cards with your live deployment links. The site will automatically show the "Live Demo" button as soon as a valid URL is provided.
- **Updating Resume**: Replace `resume.pdf` in the root directory with your latest PDF resume.
