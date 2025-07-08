/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgdarkblue: "#101125",
      },
      fontFamily: {
        bebas: ["'Bebas Neue'", "cursive"],
        hammersmith: ["'Hammersmith One'", "sans-serif"],
        inter: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
