/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        translateX: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        enterRight: {
          "0%": { transform: "translateX(100%) ; opacity : 0" },
          "100%": { transform: "translateX(0) ; opacity : 1" },
        },
        enterLeft: {
          "0%": { transform: "translateX(-100%) ; opacity : 0" },
          "100%": { transform: "translateX(0) ; opacity : 1" },
        },
        exitRight: {
          "0%": { transform: "translateX(0) ; opacity : 1" },
          "100%": { transform: "translateX(100%) ; opacity : 0" },
        },
        exitLeft: {
          "0%": { transform: "translateX(0) ; opacity : 1" },
          "100%": { transform: "translateX(-100%) ; opacity : 0" },
        },
        Appear: {
          "0%": { opacity : "0" },
          "100%": { opacity : "1" },
        },
      },
      animation: {
        translateX: 'translateX .5s ease-in-out',
        enterRight: "enterRight .5s ease-in-out",
        exitRight: "exitRight .5s ease-in-out",
        enterLeft: "enterLeft .5s ease-in-out",
        exitLeft: "exitLeft .5s ease-in-out",
        Appear: "Appear .5s ease-in-out",
      }
    },
  },
  plugins: [],
}

