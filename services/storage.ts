// services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: Date;
}

const TRANSACTIONS_KEY = 'budget_tracker_transactions';

export const StorageService = {
  // Get all transactions
  getTransactions: async (): Promise<Transaction[]> => {
    try {
      const data = await AsyncStorage.getItem(TRANSACTIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  },

  // Add a new transaction
  addTransaction: async (newTransaction: Transaction): Promise<boolean> => {
    try {
      // Get existing transactions
      const existingTransactions = await StorageService.getTransactions();
      
      // Add new transaction to the beginning of the array
      const updatedTransactions = [newTransaction, ...existingTransactions];
      
      // Save updated array
      await AsyncStorage.setItem(
        TRANSACTIONS_KEY, 
        JSON.stringify(updatedTransactions)
      );
      
      return true;
    } catch (error) {
      console.error('Error adding transaction:', error);
      return false;
    }
  },

  // Delete a transaction
  deleteTransaction: async (transactionId: string): Promise<boolean> => {
    try {
      const transactions = await StorageService.getTransactions();
      const updatedTransactions = transactions.filter(
        t => t.id !== transactionId
      );
      
      await AsyncStorage.setItem(
        TRANSACTIONS_KEY, 
        JSON.stringify(updatedTransactions)
      );
      
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      return false;
    }
  },

  // Update a transaction
  updateTransaction: async (
    transactionId: string, 
    updatedData: Partial<Transaction>
  ): Promise<boolean> => {
    try {
      const transactions = await StorageService.getTransactions();
      const updatedTransactions = transactions.map(t => 
        t.id === transactionId ? { ...t, ...updatedData } : t
      );
      
      await AsyncStorage.setItem(
        TRANSACTIONS_KEY, 
        JSON.stringify(updatedTransactions)
      );
      
      return true;
    } catch (error) {
      console.error('Error updating transaction:', error);
      return false;
    }
  },

  // Clear all transactions
  clearTransactions: async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(TRANSACTIONS_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing transactions:', error);
      return false;
    }
  }
};