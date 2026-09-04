/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fi: {
          purple: "#712CDC",
          "purple-hover": "#8852e1",
          "purple-dark": "#5300d9",
          "purple-light": "#ede8ff",
          lavender: "#f5f0ff",
          border: "#ece5ff",
          surface: "#faf8ff",
          dark: "#121212",
          muted: "#6B7280",
          savings: "#059669",
          "savings-light": "#ecfdf5",
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        'fi-card': '0 2px 10px rgba(20, 14, 50, 0.05)',
        'fi-hover': '0 8px 24px rgba(113, 44, 220, 0.12)',
        'fi-nav': '0 8px 32px rgba(20, 14, 50, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.18) inset',
      }
    },
  },
  plugins: [],
}
