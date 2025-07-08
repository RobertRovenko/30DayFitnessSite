module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgdarkblue: "#101125",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
