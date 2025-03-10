/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B7E2C4", // Soft green
        secondary: "#F6BE6F", // Toned down orange
        button: "#CF0C54", // Button color
      },

      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      container: {
        screens: {
          xl: "1150px",
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
