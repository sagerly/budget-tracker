// components/ThemedView.tsx

import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface ThemedViewProps extends ViewProps {
  variant?: 'primary' | 'card';
}

export function ThemedView({
  style,
  variant = 'primary',
  ...props
}: ThemedViewProps) {
  const { colors } = useTheme();

  const viewStyles = [
    styles.base,
    { backgroundColor: variant === 'card' ? colors.card : colors.background },
    style,
  ];

  return <View style={viewStyles} {...props} />;
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});