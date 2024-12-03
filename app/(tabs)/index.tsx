// app/(tabs)/index.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText 
        size="xlarge" 
        weight="bold" 
        style={styles.title}
      >
        Overview
      </ThemedText>
      
      <ThemedView variant="card" style={styles.card}>
        <ThemedText size="large" weight="medium">
          Current Balance
        </ThemedText>
        <ThemedText 
          size="xlarge" 
          weight="bold" 
          style={styles.amount}
        >
          $2,450.85
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 24,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  amount: {
    marginTop: 8,
  },
});