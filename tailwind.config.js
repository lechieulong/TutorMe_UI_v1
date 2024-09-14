import preline from "preline/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'], // GitHub-like font stack
      },

    },
  },
  plugins: [
    preline, // Sử dụng import thay cho require
  ],
};
