/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDD0",
        solar: "#FFD700",
        peach: "#FFDAB9",
        vibrant: "#FF8C00",
        charcoal: "#2F2F2F",
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'brutal': '5px 5px 0px #2F2F2F',
        'brutal-hover': '7px 7px 0px #2F2F2F',
      }
    },
  },
  plugins: [],
}
