/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Legacy token from the previous site palette. Kept so any remaining
        // reference still resolves, but the pages now use the app tokens below.
        bgdarkblue: "#101125",

        // 30 Day Fitness app palette, mirrored from HomeScreen / PaywallOverlay /
        // WelcomeTour so the site renders the same surfaces as the product.
        app: {
          DEFAULT: "#001220", // BG - also the app's splash + adaptive icon colour
          bg: "#001220",
          // BG_ELEVATED from the app, kept for palette parity. The header and
          // footer bands used to sit on this colour; they now match bg so the
          // page reads as one flat surface.
          elevated: "#081b2e",
          surface: "#1A2430", // SURFACE - resting cards
          raised: "#222D3A", // SURFACE_ELEVATED - selected / primary cards
        },
        ink: {
          primary: "#EAEAEA", // TEXT_PRIMARY
          secondary: "#B0B0B0", // TEXT_SECONDARY
          tertiary: "#7FA3B8", // TEXT_TERTIARY
        },
        // The app's single accent. Reserved for Pro, primary actions and the
        // gold frame + glow that marks the highlighted card.
        accent: {
          DEFAULT: "#FFD700",
          soft: "rgba(255, 215, 0, 0.16)", // glow halo
          wash: "rgba(255, 215, 0, 0.07)", // spotlight fill
        },
        hairline: "rgba(255, 255, 255, 0.10)",
      },
      boxShadow: {
        // planWrapPrimary in PaywallOverlay.js: a gold frame with a soft halo.
        gold: "0 0 14px rgba(255, 215, 0, 0.30)",
        "gold-lg": "0 0 28px rgba(255, 215, 0, 0.28)",
      },
      fontFamily: {
        bebas: ["'Bebas Neue'", "cursive"],
        hammersmith: ["'Hammersmith One'", "sans-serif"],
        inter: ["'Inter'", "sans-serif"],
        // Navbar wordmark. A condensed face like Bebas, but it carries a real
        // weight range, so the brand can sit at semibold instead of 400.
        oswald: ["'Oswald'", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

