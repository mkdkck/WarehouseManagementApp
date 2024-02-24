/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      'xxl': '25px'
    },
    extend: {
    },
  },
  plugins: [require("daisyui")],
}

