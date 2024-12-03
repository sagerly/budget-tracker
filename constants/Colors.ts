// constants/Colors.ts

export const Colors = {
  light: {
    primary: '#007AFF',          // Main brand color
    secondary: '#5856D6',        // Secondary brand color
    background: '#F2F2F7',       // Main background
    card: '#FFFFFF',             // Card/Surface background
    text: {
      primary: '#000000',        // Primary text
      secondary: '#666666',      // Secondary/dimmed text
      inverse: '#FFFFFF'         // Text on dark backgrounds
    },
    border: '#E5E5EA',          // Border color
    success: '#34C759',         // Success states
    danger: '#FF3B30',          // Error states
    warning: '#FFCC00'          // Warning states
  },
  dark: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    card: '#1C1C1E',
    text: {
      primary: '#FFFFFF',
      secondary: '#EBEBF5',
      inverse: '#000000'
    },
    border: '#38383A',
    success: '#30D158',
    danger: '#FF453A',
    warning: '#FFD60A'
  }
};

// Type definitions for our theme
export type ThemeColors = typeof Colors.light;