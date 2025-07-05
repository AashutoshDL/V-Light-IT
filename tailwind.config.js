module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // If using app directory in Next.js 13+
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(51, 43, 43)",
        foreground: "rgb(255, 255, 255)",
        "button-background": "rgb(51, 43, 43)",
        "button-text": "rgb(255, 255, 255)",
      },
    },
  },
  plugins: [],
};
