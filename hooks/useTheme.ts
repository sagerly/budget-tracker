// hooks/useTheme.ts

import { useColorScheme } from './useColorScheme';
import { Colors, ThemeColors } from '../constants/Colors';

export function useTheme() {
  const colorScheme = useColorScheme();
  
  // Get the current theme colors based on color scheme
  const colors: ThemeColors = Colors[colorScheme];
  
  // Helper function to get specific color values
  const getColor = (path: string) => {
    return path.split('.').reduce((obj, key) => obj[key], colors);
  };

  return {
    colors,
    colorScheme,
    getColor
  };
}