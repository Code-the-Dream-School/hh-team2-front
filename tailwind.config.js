/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], // İçeriği kontrol et
  theme: {
    extend: {
      colors: {
        'custom-light-blue': '#d5e2f1', 
      },
    },
  },
  plugins: [],
};

