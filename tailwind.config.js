/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        alxRed: "#a63c3cff",
        darkBg: "#0d052dff",
        darkCard: "#1A1A1A",
        darkText: "#E2E2E2",
      },
    },
  },
  plugins: [],
};
