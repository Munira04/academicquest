/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0B0B0F',
          secondary: '#1A102B',
          card: '#211538',
        },
        accent: {
          purple: '#8B5CF6',
          hover: '#A78BFA',
          green: '#22C55E',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
        },
        border: {
          purple: '#2d1f4e',
          light: '#3d2a6e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}