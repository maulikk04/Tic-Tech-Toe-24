/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'blackboard-bg': "url('https://www.shutterstock.com/shutterstock/videos/1028158454/thumb/6.jpg?ip=x480')", 
      },
      fontFamily: {
        'chalk': ['"Permanent Marker"', 'cursive'],
      },
      colors: {
        blackboard: '#2B2B2B', 
        brown: '#8B4513', 
      },
    },
  },
  plugins: [],
}