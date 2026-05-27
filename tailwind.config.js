/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-color)',
        surface: 'var(--surface-color)',
        border: 'var(--border-color)',
        brand: {
          400: 'var(--brand-accent)',
          500: 'var(--brand-accent)',
          600: 'var(--brand-accent-hover)',
        }
      },
      textColor: {
        main: 'var(--text-main)',
        muted: 'var(--text-muted)',
      },
      boxShadow: {
        float: 'var(--shadow-glow)',
      },
    },
  },
  plugins: [],
}
