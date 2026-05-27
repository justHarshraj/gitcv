# ⚡️ GitCV: The Zero-Gravity Developer Portfolio

![GitCV Banner](https://via.placeholder.com/1200x300/0a0a0a/7ca380?text=GitCV+-+Transform+GitHub+Profiles+into+Stunning+Resumes)

[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

🚀 **Live Demo:** [https://gitcv-o4ya8ediw-harshrajs1k-5992s-projects.vercel.app/](https://gitcv-o4ya8ediw-harshrajs1k-5992s-projects.vercel.app/)

**GitCV** is a modern, client-side React application that transforms any public GitHub profile into a beautifully formatted, interactive, and print-ready developer resume. 

Unlike standard API-fetch tutorials, GitCV is engineered to handle real-world constraints. It features intelligent rate-limit protections, custom algorithmic skill inference, dynamic CSS-variable theming, and an advanced template engine capable of generating everything from strict ATS-compliant documents to interactive 3D dashboards.

---

## 📖 Table of Contents
1. [The Problem & The Solution](#-the-problem--the-solution)
2. [Key Features](#-key-features)
3. [Architecture & Engineering Decisions](#-architecture--engineering-decisions)
4. [Tech Stack](#-tech-stack)
5. [Local Development Setup](#-local-development-setup)
6. [Detailed Project Structure](#-detailed-project-structure)
7. [Deployment Guide](#-deployment-guide)
8. [Roadmap & Future Features](#-roadmap--future-features)
9. [License](#-license)

---

## 🎯 The Problem & The Solution

**The Problem:** GitHub profiles are excellent for hosting code, but they are poor at instantly conveying a developer's high-level narrative to recruiters. Generating a resume manually is tedious, and existing automated generators often produce ugly, unformatted text dumps that fail Applicant Tracking Systems (ATS) or look outdated.

**The Solution:** GitCV bridges this gap by acting as a dynamic presentation layer on top of the GitHub API. It parses raw repository data, infers technical proficiency, and wraps it in a highly polished, customizable UI that can be shared as a live web link or exported as a pixel-perfect PDF.

---

## ✨ Key Features

### 🎨 Dynamic Template Engine
GitCV doesn't force a one-size-fits-all layout. Users can switch between templates based on their target audience:
* **Modern Tech (Startup):** A bold, two-column layout optimized for visual impact, featuring skill tags and prominent avatar displays.
* **ATS Professional:** A strict, single-column, high-contrast layout stripped of complex CSS to ensure 100% readability by corporate Applicant Tracking Systems.
* **Canvas Grid Dashboard:** An interactive, Framer Motion-powered 3D dashboard for shareable web portfolios, complete with draggable components.

### 🌓 Multi-Theming System
The app utilizes a CSS-variable-driven theme engine rather than relying purely on Tailwind's dark mode toggle. By injecting `data-theme` attributes into the `:root` HTML element, users can instantly swap between:
* **Dark Mode** (Deep slate and vibrant blues)
* **High-Contrast Light** (Optimized for readability)
* **Canvas Grid** (A premium node-editor aesthetic with Sage Green accents and infinite grid backgrounds)

### 📊 Algorithmic Proficiency Scoring
GitCV doesn't just list languages. It runs a custom algorithm against a user's repositories to calculate a "Proficiency Score." By combining the *byte volume* of a language with the *frequency of repositories* it appears in, the app automatically categorizes skills as **Advanced**, **Intermediate**, or **Familiar**.

### 🖨️ Client-Side PDF Export Engine
Generating PDFs from modern web apps is notoriously difficult due to CSS transforms and SVG animations. GitCV seamlessly handles this via `html2pdf.js` by orchestrating a pre-print state:
1. Temporarily forces a high-contrast Light theme to save printer ink.
2. Disables all Framer Motion 3D transforms.
3. Captures the DOM via HTML2Canvas, scales it for high resolution, and generates the PDF.
4. Restores the user's preferred theme seamlessly.

---

## 🧠 Architecture & Engineering Decisions

Building a robust frontend against a public API required specific architectural choices:

* **Intelligent Rate Limiting:** The unauthenticated GitHub API strictly limits users to 60 requests per hour. Fetching language data requires pinging a separate `/languages` endpoint for *every* repository. To prevent immediate `403 Forbidden` errors, GitCV sorts a user's repositories client-side by star/fork count and **only fetches language statistics for their top 5 most popular projects**.
* **Decoupled Routing:** By utilizing `react-router-dom`, the application state is tied to the URL (e.g., `localhost:5173/u/torvalds`). This allows users to share direct links to their live, animated resumes without requiring backend persistence.
* **Physics Offloading:** Complex 3D tilt effects and infinite floating animations are handled by `framer-motion`, which manages animation frames outside of the main React render cycle to maintain 60FPS performance.

---

## 🛠 Tech Stack

* **Framework:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
* **Routing:** [React Router v6](https://reactrouter.com/)
* **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Drag and Drop:** [@dnd-kit/core](https://docs.dndkit.com/)
* **Data Fetching:** [Axios](https://axios-http.com/)
* **Visualizations:** [Recharts](https://recharts.org/), [React GitHub Calendar](https://grubersjoe.github.io/react-github-calendar/)
* **Export Engine:** [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/)

---

## 🚀 Local Development Setup

Follow these steps to run GitCV locally on your machine.

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/GitCV.git
cd GitCV
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up Environment Variables (Optional but Recommended)**
To bypass the 60-request/hr limit during heavy testing, create a `.env` file in the root directory and add a GitHub Personal Access Token (classic):
```env
VITE_GITHUB_TOKEN=your_personal_access_token_here
```
*(Note: You will need to update `githubApi.js` to pass this token in the Axios headers if configured).*

**4. Start the development server**
```bash
npm run dev
```

**5. View the app**
Navigate to `http://localhost:5173` in your browser.

---

## 📁 Detailed Project Structure
```plaintext
src/
 ├── animations/          
 │    ├── FloatingElement.jsx  # Infinite slow vertical translation wrapper
 │    └── TiltCard.jsx         # 3D mouse-tracking physics wrapper
 │
 ├── components/          
 │    ├── HeatmapSection.jsx   # GitHub contribution graph renderer
 │    ├── LanguageChart.jsx    # Recharts pie chart configuration
 │    ├── SortableItem.jsx     # Dnd-kit draggable wrapper
 │    ├── ThemeToggle.jsx      # CSS variable injection controller
 │    └── ... (SearchBar, ProfileCard, RepoGrid)
 │
 ├── pages/               
 │    ├── Home.jsx             # Landing page and search routing
 │    └── Resume.jsx           # Data fetching, DndContext, and Export orchestration
 │
 ├── services/            
 │    └── githubApi.js         # Axios instance, timeout configs, and rate-limit handling
 │
 ├── templates/           
 │    ├── ATSProfessional.jsx  # Single-column strict layout
 │    ├── DevPortfolio.jsx     # Dashboard layout
 │    └── ModernTech.jsx       # Two-column visual layout
 │
 ├── utils/               
 │    ├── calculateSkills.js   # Advanced proficiency scoring algorithm
 │    ├── generateSummary.js   # Dynamic string interpolation for bios
 │    └── validators.js        # Regex validation to prevent bad API calls
 │
 ├── App.jsx              # React Router configuration
 └── index.css            # Tailwind directives and core CSS Variable theme definitions
```

---

## 🔮 Roadmap & Future Features
- [ ] **OAuth 2.0 Integration:** Allow users to explicitly "Sign In with GitHub" to securely fetch private repository statistics and bump API limits to 5,000/hr.
- [ ] **AI Bio Enhancement:** Connect the Groq/Llama3 API to offer a "Rewrite my Bio" feature that generates a professional elevator pitch based on code history.
- [ ] **Custom Domain Support:** Allow users to map their generated GitCV to a personal domain name.
