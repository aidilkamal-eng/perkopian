/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        'sub-heading': ['var(--font-sub-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        handwriting: ['var(--font-handwriting)', 'cursive'],
      },
      colors: {
        cream: '#F7EAD7',
        'cream-light': '#F9F1E5',
        'cream-dark': '#FCE5BF',
        espresso: '#45231A',
        'espresso-dark': '#3B200F',
        caramel: '#B85B19',
        'caramel-dark': '#824015',
      },
    },
  },
  plugins: [],
};
