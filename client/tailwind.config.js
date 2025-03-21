module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/shared/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#D1D5DB', // Light gray for buttons and accents
        'primary-dark': '#4B5563',  // Dark gray for buttons
        'secondary-light': '#9CA3AF',
        'secondary-dark': '#6B7280',
        'background-light': '#F3F4F6', // Flattened background key
        'background-dark': '#1F2937', // Flattened background key
        'surface-light': '#E5E7EB',
        'surface-dark': '#374151',
        'text-light': '#1F2937',
        'text-dark': '#F3F4F6',
      },
      fontSize: {
        sm: '0.875rem', // 14px
        base: '1rem',   // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem',  // 20px
      },
      spacing: {
        xs: '0.25rem',  // 4px
        sm: '0.5rem',   // 8px
        md: '1rem',     // 16px
        lg: '1.5rem',   // 24px
        xl: '2rem',     // 32px
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
