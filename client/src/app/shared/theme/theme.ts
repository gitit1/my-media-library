export const lightTheme = {
  colors: {
    primary: '#D1D5DB', // Light gray for buttons and accents
    secondary: '#9CA3AF', // Slightly darker gray for secondary elements
    background: '#F3F4F6', // Light gray background
    surface: '#E5E7EB', // Slightly darker gray for component backgrounds
    text: '#1F2937', // Dark gray for text
  },
  typography: {
    fontSize: {
      sm: '0.875rem', // 14px
      base: '1rem',   // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem',  // 20px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700',
    },
    lineHeight: {
      normal: '1.5',
      heading: '1.2',
    },
  },
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
  },
};

export const darkTheme = {
  colors: {
    primary: '#4B5563', // Lighter gray for buttons in dark mode
    secondary: '#6B7280', // Slightly darker for hover state
    background: '#1F2937', // Dark gray background
    surface: '#374151', // Slightly lighter gray for component backgrounds
    text: '#F3F4F6', // Light gray text
  },
  typography: lightTheme.typography,
  spacing: lightTheme.spacing,
};
