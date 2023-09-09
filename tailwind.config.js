/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        BlueNight:'#0F172A',
        GreyNight:'#3B4157',
        WhiteNight:'#E6EFFF',
        YellowNight:'#D4A418'
      },
      backgroundImage: {
        night: "url('/night.jpg')",
        morning: "url('/morning3.jpg')",
      },
      
      fontFamily:{
        Rubik:['Rubik']
      }
    },
  },
  plugins: [],
}