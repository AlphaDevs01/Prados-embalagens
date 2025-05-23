/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#e6f7ef',
          100: '#ccf0df',
          200: '#99e1bf',
          300: '#66d29f',
          400: '#33c37f',
          500: '#0d9f61',
          600: '#0a7f4d',
          700: '#075f3a',
          800: '#054026',
          900: '#022013',
        },
        'secondary': {
          50: '#f3f4f6',
          100: '#e7e9ed',
          200: '#d0d3db',
          300: '#b8bdc9',
          400: '#a1a7b7',
          500: '#8991a5',
          600: '#6e7484',
          700: '#525763',
          800: '#373a42',
          900: '#1b1d21',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};