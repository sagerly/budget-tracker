// components/ThemedText.tsx

import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface ThemedTextProps extends TextProps {
  variant?: 'primary' | 'secondary' | 'inverse';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  weight?: 'normal' | 'medium' | 'bold';
}

export function ThemedText({
  style,
  variant = 'primary',
  size = 'medium',
  weight = 'normal',
  ...props
}: ThemedTextProps) {
  const { colors } = useTheme();

  const textStyles = [
    styles.base,
    // Text color based on variant
    { color: colors.text[variant] },
    // Text size
    size === 'small' && { fontSize: 14 },
    size === 'medium' && { fontSize: 16 },
    size === 'large' && { fontSize: 18 },
    size === 'xlarge' && { fontSize: 24 },
    // Font weight
    weight === 'medium' && { fontWeight: '500' },
    weight === 'bold' && { fontWeight: 'bold' },
    // Custom styles passed as props
    style,
  ];

  return <Text style={textStyles} {...props} />;
}

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
    fontWeight: 'normal',
  },
});