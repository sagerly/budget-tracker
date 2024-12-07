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

const listeners = new Set<() => void>();


export const StorageService = {
    // Event subscription management
    addListener: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  
    // Notify all listeners of changes
    notifyListeners: () => {
      listeners.forEach(listener => listener());
    },
  
    // Get all transactions
    getTransactions: async (): Promise<Transaction[]> => {
      try {
        const data = await AsyncStorage.getItem(TRANSACTIONS_KEY);
        if (!data) return [];
        
        // Parse the data and ensure dates are properly converted back to Date objects
        const transactions = JSON.parse(data);
        return transactions.map((t: any) => ({
          ...t,
          date: new Date(t.date)
        }));
      } catch (error) {
        console.error('Error getting transactions:', error);
        return [];
      }
    },


  // Add a new transaction
  addTransaction: async (newTransaction: Transaction): Promise<boolean> => {
    try {
      const existingTransactions = await StorageService.getTransactions();
      const updatedTransactions = [newTransaction, ...existingTransactions];
      
      await AsyncStorage.setItem(
        TRANSACTIONS_KEY, 
        JSON.stringify(updatedTransactions)
      );
      
      // Notify listeners of the new transaction
      StorageService.notifyListeners();
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
      
        // Notify listeners of the deletion
        StorageService.notifyListeners();
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
      
      // Notify listeners of the update
      StorageService.notifyListeners();
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
      
      // Notify listeners of the clear operation
      StorageService.notifyListeners();
      return true;
    } catch (error) {
      console.error('Error clearing transactions:', error);
      return false;
    }
  }
};