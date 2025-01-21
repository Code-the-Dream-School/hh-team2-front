export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  // tailwind.config.js

  theme: {
    extend: {
      spacing: {
        '128': '32rem', // Adds a spacing of 32rem (512px)
        '160': '40rem', // Adds a spacing of 40rem (640px)
      },
    },
  },


}
