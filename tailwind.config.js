/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        small: "5%",
        middlemedium: "20%",
        medium: "10%",
        long: "30%",
        superlong: "100%",
      },
    },
  },
  plugins: [],
}
