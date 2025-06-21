/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      boxShadow: {
        'custom-deep': '0px 4px 22px rgba(0, 0, 0, 0.15), 0px 4px 44px rgba(37, 37, 37, 0.05) inset',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          // '2xl': '1560px',
        },
      },
      colors: {
        light: '#f5f6fa99',
        lightText: '#b4bbc6',
        darkText: '#3b4453',
        orange: '#ff7739'
      },
      fontSize: {
        huge: ['4rem', '1.2'],
        '40': ['40px', '1.2'],
        '30': ['30px', '1.3'],
        '36': ['36px', '1.3'],
        '28': ['28px', '1.3'],
        '26': ['26px', '1.3'],
        '24': ['24px', '1.3'],
        '22': ['22px', '1.4'],
        '20': ['20px', '1.4'],
        '18': ['18px', '1.4'],
        '16': ['16px', '1.5'],
        '14': ['14px', '1.4'],
        '12': ['12px', '1.4'],
      },
    },
  },
  plugins: [],
}