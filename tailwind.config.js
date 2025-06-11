/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
    theme: {
      extend: {
        colors: {
          emeraldCustom: 'rgb(29, 191, 115)', // name it whatever you like
          primary: 'oklch(60% 0.2 240)', // <--- THIS WOULD CAUSE THE PROBLEM
        },
          screens: {
        'customaus': '350px', 
      },
      },
    },
    plugins: [], 
  };
  