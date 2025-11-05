/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        alxRed: "#E22D2D",
        darkBg: "#0D0D0D",
        darkCard: "#1A1A1A",
        darkText: "#E2E2E2",
      },
    },
  },
  plugins: [],
};
