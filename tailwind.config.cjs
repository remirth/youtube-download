/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['JetBrains Mono'],
    },
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#F28C18',
          secondary: '#6D3A9C',
          accent: '#51A800',
          neutral: '#1B1D1D',
          'base-100': '#212121',
          info: '#2463EB',
          success: '#16A249',
          warning: '#DB7706',
          error: '#DC2828',
        },
      },
    ],
  },
};
