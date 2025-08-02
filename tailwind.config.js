/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F7F7',
          100: '#C0EDED',
          200: '#9ADEE2',
          300: '#60CAD3',
          400: '#30B5C5',
          500: '#0F766E', // primary color
          600: '#0E6A63',
          700: '#0C5957',
          800: '#094A4A',
          900: '#073F3F',
        },
        secondary: {
          50: '#E6F7FB',
          100: '#CCE9F6',
          200: '#99D4ED',
          300: '#66BEE3',
          400: '#33A9DA',
          500: '#0891B2', // secondary color
          600: '#077FA0',
          700: '#066E8A',
          800: '#055D75',
          900: '#044C60',
        },
        accent: {
          50: '#FFF4E6',
          100: '#FFE8CC',
          200: '#FFD199',
          300: '#FFB966',
          400: '#FFA233',
          500: '#FF8C00', // accent color
          600: '#E67E00',
          700: '#CC7000',
          800: '#B36200',
          900: '#995400',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        danger: {
          500: '#EF4444',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        popup: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};