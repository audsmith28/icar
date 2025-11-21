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
        // ICAR Brand Colors
        'sea-green': {
          darkest: '#004d55',
          darker: '#006d77',
          DEFAULT: '#006d77',
          light: '#83c5be',
          'off-white': '#f0f9fa',
        },
        'orange': {
          DEFAULT: '#e29578',
          light: '#ffddd2',
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
