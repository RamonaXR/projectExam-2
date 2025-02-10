/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B7E2C4", // Soft green
        secondary: "#F6BE6F", // Warm orange
        button: "#F67878", // Button color
      },
      fontFamily: {
        sans: ["Lunasima", "sans-serif"],
      },
    },
  },
  plugins: [],
};
