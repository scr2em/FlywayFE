import { createTheme, type MantineColorsTuple } from '@mantine/core';

// Custom color palette
const primaryColor: MantineColorsTuple = [
  '#f0f0ff',
  '#d9d9ff',
  '#b3b3ff',
  '#8c8cff',
  '#6666ff',
  '#4d4dff',
  '#667eea', // Primary brand color
  '#5a6dd3',
  '#4d5cbd',
  '#404ba6',
];

const secondaryColor: MantineColorsTuple = [
  '#f5f0ff',
  '#e6d9ff',
  '#d1b3ff',
  '#bb8cff',
  '#a666ff',
  '#9a4dff',
  '#764ba2', // Secondary brand color
  '#673f8f',
  '#58347c',
  '#492969',
];

export const theme = createTheme({
  /** Primary brand color */
  primaryColor: 'brand',
  
  /** Color palette */
  colors: {
    brand: primaryColor,
    accent: secondaryColor,
  },

  /** Spacing scale - use these instead of hard-coded values */
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  /** Font sizes - use these for consistent typography */
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '40px', // For large headings
  },

  /** Line heights */
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.5',
    lg: '1.6',
    xl: '1.65',
  },

  /** Breakpoints for responsive design */
  breakpoints: {
    xs: '36em',  // 576px
    sm: '48em',  // 768px
    md: '62em',  // 992px
    lg: '75em',  // 1200px
    xl: '88em',  // 1408px
  },

  /** Border radius tokens */
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },

  /** Shadow tokens */
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  /** Heading styles */
  headings: {
    fontWeight: '700',
    sizes: {
      h1: {
        fontSize: '40px',
        lineHeight: '1.2',
      },
      h2: {
        fontSize: '32px',
        lineHeight: '1.25',
      },
      h3: {
        fontSize: '24px',
        lineHeight: '1.3',
      },
      h4: {
        fontSize: '20px',
        lineHeight: '1.35',
      },
      h5: {
        fontSize: '18px',
        lineHeight: '1.4',
      },
      h6: {
        fontSize: '16px',
        lineHeight: '1.45',
      },
    },
  },
});
