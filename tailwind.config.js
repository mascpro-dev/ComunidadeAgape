/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#f4f7ff",
        muted: "#9db0d4",
        navy: "#06153a",
        deep: "#030b1f",
        gold: "#d6c08a",
        sky: "#7eb6ff",
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        phone: "0 40px 80px rgba(0,0,0,.55)",
      },
    },
  },
  plugins: [],
};
