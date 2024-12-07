import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Button } from '../../components/ui/Button';
import { router } from 'expo-router';
import { StorageService, Transaction } from '../../services/storage';
import { Input } from '../../components/ui/Input'

export default function AddTransactionScreen() {
  // Form state
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [loading, setLoading] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return false;
    }
    if (!category.trim()) {
      Alert.alert('Error', 'Please select a category');
      return false;
    }
    return true;
  };

  const handleSubmitTransaction = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const newTransaction: Transaction = {
        id: Date.now().toString(), // Simple ID generation
        amount: Number(amount),
        description: description.trim(),
        category: category.trim(),
        type: type,
        date: new Date(),
      };

      const success = await StorageService.addTransaction(newTransaction);

      if (success) {
        Alert.alert(
          'Success',
          'Transaction added successfully',
          [
            {
              text: 'OK',
              onPress: () => router.push('/(tabs)/transactions')
            }
          ]
        );
      } else {
        throw new Error('Failed to save transaction');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add transaction');
      console.error('Error adding transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (amount || description || category) {
      Alert.alert(
        'Discard Changes',
        'Are you sure you want to discard this transaction?',
        [
          {
            text: 'No',
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => router.back()
          }
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Add Transaction</ThemedText>

        <View style={styles.form}>
          {/* Transaction Type Toggle */}
          <View style={styles.typeToggle}>
            <Button
              variant={type === 'expense' ? 'primary' : 'outline'}
              label="Expense"
              onPress={() => setType('expense')}
              size="small"
              style={styles.toggleButton}
            />
            <Button
              variant={type === 'income' ? 'primary' : 'outline'}
              label="Income"
              onPress={() => setType('income')}
              size="small"
              style={styles.toggleButton}
            />
          </View>

          {/* Amount Input */}
          <Input
            label="Amount"
            keyboardType="decimal-pad"
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
          />

          {/* Description Input */}
          <Input
            label="Description"
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
          />

          {/* Category Input */}
          <Input
            label="Category"
            placeholder="Select category"
            value={category}
            onChangeText={setCategory}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          variant="outline"
          label="Cancel"
          onPress={handleCancel}
          style={styles.button}
        />
        <Button
          variant="primary"
          label="Add Transaction"
          onPress={handleSubmitTransaction}
          loading={loading}
          style={styles.button}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  typeToggle: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  toggleButton: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  button: {
    flex: 1,
  },
});