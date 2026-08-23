/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFDF8', // Warm Ivory
        surface: '#FFFFFF',
        surfaceSecondary: '#F6F3FF', // Very Light Lavender
        primary: '#1F2937', // Deep Ink / Navy
        muted: '#667085', // Muted Slate
        brand: '#7567D9', // Muted Violet
        brandSecondary: '#E78B78', // Warm Coral
        rating: '#F4C95D', // Soft Golden Yellow
        success: '#6FAF88', // Muted Sage Green
        borderSoft: '#E9E6EF',
        pastel: {
          lavender: '#EEE9FF',
          peach: '#FFF1E7',
          mint: '#EAF6EF',
          blue: '#EAF5FA',
          yellow: '#FFF6D8',
          rose: '#FFF0F3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 8px 24px -4px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'lg': '10px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
