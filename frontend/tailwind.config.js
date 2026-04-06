/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#7C4B2A',
          light: '#A0622F',
          dark: '#5C3418',
        },
        accent: {
          DEFAULT: '#E8A87C',
          light: '#F5D0B5',
        },
        surface: '#FDFAF7',
        page: '#F5F0EB',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.14)',
      },
      borderRadius: {
        'xl2': '1rem',
        '2xl': '1.25rem',
      }
    },
  },
  plugins: [],
}