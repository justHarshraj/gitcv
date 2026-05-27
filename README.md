# 🚀 GitCV (Anti-Gravity Edition)

GitCV is a modern, React-based web application that transforms public GitHub profiles into polished, professional developer resumes. Designed with a custom "anti-gravity" glassmorphism aesthetic, it goes beyond a standard API fetch to provide automated skill inference, language data visualization, and PDF generation.

## ✨ Core Features
- **Zero-Gravity UI:** Utilizes Framer Motion and custom physics hooks to create interactive, 3D-tilting, floating dashboard cards.
- **Automated Intelligence:** Generates developer summaries and infers technical skills based on repository topics, descriptions, and language statistics without relying on slow external AI APIs.
- **Optimized Data Fetching:** Implements intelligent sorting to only request `/languages` data for a user's top 5 repositories, drastically reducing the likelihood of hitting GitHub's rate limits.
- **Data Visualization:** Renders interactive, customized pie charts using Recharts.
- **Client-Side PDF Export:** Seamlessly captures the DOM and exports the dynamic layout into a highly formatted, printable PDF.

## 🛠 Tech Stack
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v3 (Glassmorphism + Dark Mode)
- **Animations:** Framer Motion
- **Data Handling:** Axios
- **Visualization:** Recharts
- **Export Engine:** html2pdf.js

## 📦 Installation & Local Setup

1. Clone the repository to your local machine.
2. Ensure you have Node.js installed.
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:5173 in your browser.

## 🧪 Edge Cases Handled
- **Rate Limit Protection:** Captures 403 status codes and outputs a clean UI error message.
- **Empty States:** Handles accounts with zero public repositories gracefully.
- **Malformed Inputs:** Custom regex and space validators prevent unnecessary API calls.
- **Print Optimization:** Disables SVG animations during PDF generation to prevent blank captures.
