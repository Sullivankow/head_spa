/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#2c2926",
        cream: "#f7f2eb",
        sand: "#e8ddd0",
        rose: "#b8897c",
        sage: "#77836f"
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
};