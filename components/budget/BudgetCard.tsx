import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';

export function BudgetCard() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Monthly Budget</ThemedText>
      <ThemedText style={styles.amount}>$2,000.00</ThemedText>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <ThemedText style={styles.statLabel}>Spent</ThemedText>
          <ThemedText style={styles.statValue}>$500.00</ThemedText>
        </View>
        <View style={styles.stat}>
          <ThemedText style={styles.statLabel}>Remaining</ThemedText>
          <ThemedText style={styles.statValue}>$1,500.00</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
});