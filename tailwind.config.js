/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',     // Deep Slate/Navy Blue
        secondary: '#64748B',   // Slate Blue/Grey
        tertiary: '#94A3B8',    // Light Slate Blue/Grey
        neutralCool: '#F8FAFC', // Light Cool Grey/White
        brandBlue: '#2853A4',   // Jerush Brand Royal Blue
        brandSky: '#1E97D4'     // Jerush Brand Sky Blue
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
