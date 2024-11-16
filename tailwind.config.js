import preline from "preline/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Segoe UI"', "Roboto", "Arial", "sans-serif"], // GitHub-like font stack
      },
      colors: {
        mainColor: "#006241", // Green button color
        accentGreen: "#00754A", // Accent green
        lightGreen: "#D4E9E2", // Light green
        houseGreen: "#1E3932", // House green
        black: "#000000", // Black
        warmNeutral: "#F2F0EB", // Warm neutral
        coolNeutral: "#EFEFF0", // Cool neutral
        white: "#FFFFFF", // White
        customText: "#FEF6c7", //
      },
    },
  },
  plugins: [
    preline, // Sử dụng import thay cho require
  ],
};
