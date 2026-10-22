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
        cream: '#F7EAD7',
        'cream-light': '#F9F1E5',
        'cream-dark': '#FCE5BF',
        espresso: '#45231A',
        caramel: '#B85B19'
      },
    },
  },
  plugins: [],
};
