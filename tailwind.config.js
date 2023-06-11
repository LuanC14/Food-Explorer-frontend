/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    fontSize: {
      xxxs: 12,
      xxs: 14,
      xs: 16,
      sm: 20,                    
      md: 24,
      lg: 32,
      xl: 40,
      xxl: 42,
    },

    colors: {

      white: {
        100: '#E1E1E6',
        200: '#E1E1E6',
        300: '#FFFAF1',
        400: '#FFFFFF'
      },

      gray: {
        400: '#C4C4CC',
        500: '#7C7C8A',
        600: '#76797B',
        700: '#4D585E'
      },

      dark: {  
        100: '#000405',
        200: '#00070A',
        300: '#000204',
        400: '#000A0F',
        500: '#000C12',
        600: '#00111A',
        700: '#001119',
        800: '#0D161B',
        900: '#0D1D25',
        1000: '#192227'
      },

      tomato: {
        100: '#750310',
        200: '#92000E',
        300: '#AB222E',
        400: '#AB4D55', 
      },

      carrot: {
        100: '#FBA94C'
      },

      mint: {
        100: '#04D361'
      },

      cake: {
        100: '#82F3FF ',
        200: '#065E7C',
      }
    },

    fontFamily: {
      Roboto: ['Roboto ', 'sans-serif'],
      Poppins: ['Poppins', 'sans-serif'] ,
      serif: ['Merriweather', 'serif'],
    },

    extend: {},
  },
  plugins: [],
}

