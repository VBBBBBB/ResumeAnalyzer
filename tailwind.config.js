export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0b0f",
        card: "#16181f",
        accent: "#6c63ff",
        "accent-dim": "rgba(108, 99, 255, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
}
