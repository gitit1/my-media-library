export const lightTheme = {
    colors: {
      primary: '#4F46E5',
      secondary: '#EC4899',
      background: '#FFFFFF',
      text: '#111827',
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
      primary: '#4338CA',
      secondary: '#BE185D',
      background: '#1F2937',
      text: '#F3F4F6',
    },
    typography: lightTheme.typography, // Same typography in dark mode
    spacing: lightTheme.spacing, // Same spacing in dark mode
  };
  