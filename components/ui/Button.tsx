// components/ui/Button.tsx
import React from 'react';
import { 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet, 
  TouchableOpacityProps,
  View
} from 'react-native';
import { ThemedText } from '../ThemedText';
import { useTheme } from '../../hooks/useTheme';

interface ButtonProps extends TouchableOpacityProps {
  // Different button variants
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  // Button can show loading state
  loading?: boolean;
  // Button text
  label: string;
  // Optional icon to show before text
  leftIcon?: React.ReactNode;
  // Optional icon to show after text
  rightIcon?: React.ReactNode;
  // Button size
  size?: 'small' | 'medium' | 'large';
}

export function Button({
  variant = 'primary',
  loading = false,
  label,
  leftIcon,
  rightIcon,
  size = 'medium',
  style,
  disabled,
  ...props
}: ButtonProps) {
  const { colors } = useTheme();

  // Get background color based on variant
  const getBackgroundColor = () => {
    if (disabled) return '#CCCCCC';
    
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'danger':
        return colors.danger;
      case 'outline':
        return 'transparent';
      default:
        return colors.primary;
    }
  };

  // Get text color based on variant
  const getTextColor = () => {
    if (disabled) return '#666666';
    return variant === 'outline' ? colors.primary : colors.text.inverse;
  };

  // Get padding based on size
  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 16 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 24 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 20 };
    }
  };

  // Get border styles for outline variant
  const getBorderStyles = () => {
    if (variant === 'outline') {
      return {
        borderWidth: 2,
        borderColor: disabled ? '#CCCCCC' : colors.primary,
      };
    }
    return {};
  };

  const buttonStyles = [
    styles.button,
    { backgroundColor: getBackgroundColor() },
    getPadding(),
    getBorderStyles(),
    style,
  ];

  const textSize = size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium';

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={disabled || loading}
      {...props}
    >
      <View style={styles.content}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        
        {loading ? (
          <ActivityIndicator color={getTextColor()} />
        ) : (
          <ThemedText
            size={textSize}
            weight="medium"
            style={[styles.label, { color: getTextColor() }]}
          >
            {label}
          </ThemedText>
        )}

        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});