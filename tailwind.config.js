/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        subHeading: ['var(--font-sub-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        cream: '#F9F1E5',
        espresso: '#3B2010',
        caramel: '#B85B19'
      },
    },
  },
  plugins: [],
};
