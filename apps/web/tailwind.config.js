/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#33261d",
        cream: "#f8f3ea",
        sand: "#eee3d2",
        rose: "#c7a167",
        sage: "#8d6a3f",
      },
      fontFamily: {
        display: ["Bodoni Moda", "serif"],
        sans: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
