/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#c0dfff',
          300: '#80bfff',
          400: '#4099ff',
          500: '#3498db',
          600: '#2980b9',
          700: '#1e6091',
          800: '#144b76',
          900: '#0a3a5c',
        },
        secondary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        success: {
          500: '#27ae60',
        },
        danger: {
          500: '#e74c3c',
        },
        warning: {
          500: '#f39c12',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
