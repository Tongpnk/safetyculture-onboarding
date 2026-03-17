/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          purple: '#5B4CF5',
          'purple-light': '#EEF0FF',
          'purple-hover': '#4A3DE0',
        },
      },
    },
  },
  plugins: [],
}
