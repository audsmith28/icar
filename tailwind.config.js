/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ICAR Brand Colors (Updated to match website)
        'sea-green': {
          darkest: '#004d57',
          darker: '#02808b',
          DEFAULT: '#02808b',
          light: '#83c5be',
          'off-white': '#f0f9fa',
        },
        'orange': {
          DEFAULT: '#d95222',
          hover: '#c0451a',
          light: '#ffddd2',
        },
        'peach': {
          DEFAULT: '#ffb4a0',
          light: '#ffddd2',
        },
        'coral': {
          DEFAULT: '#ff8c6b',
        },
        'icar': {
          teal: {
            darkest: '#004d57',
            dark: '#02808b',
            light: '#83c5be',
            lightest: '#f0f9fa',
          },
          orange: {
            primary: '#d95222',
            hover: '#c0451a',
            light: '#ffddd2',
          },
          peach: {
            DEFAULT: '#ffb4a0',
            light: '#ffddd2',
          },
          coral: {
            DEFAULT: '#ff8c6b',
          },
          brown: {
            dark: '#48231a',
          },
        },
      },
      fontFamily: {
        heading: ['Roboto Slab', 'serif'],
        body: ['Calibri', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        'icar-sm': '4px',
        'icar-md': '8px',
        'icar-lg': '12px',
      },
      boxShadow: {
        'icar-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'icar-md': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'icar-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
