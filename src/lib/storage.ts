import { Customer, DeliveryOrder, Transaction } from '@/types';

const STORAGE_KEYS = {
  ORDERS: 'bizboost_orders',
  CUSTOMERS: 'bizboost_customers',
  TRANSACTIONS: 'bizboost_transactions'
};

export const storage = {
  // Orders
  getOrders: (): DeliveryOrder[] => {
    const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return orders ? JSON.parse(orders) : [];
  },

  saveOrder: (order: DeliveryOrder) => {
    const orders = storage.getOrders();
    orders.push(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  // Customers
  getCustomers: (): Customer[] => {
    const customers = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return customers ? JSON.parse(customers) : [];
  },

  saveCustomer: (customer: Customer) => {
    const customers = storage.getCustomers();
    const existingCustomerIndex = customers.findIndex(c => c.id === customer.id);
    
    if (existingCustomerIndex >= 0) {
      customers[existingCustomerIndex] = customer;
    } else {
      customers.push(customer);
    }
    
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  },

  // Transactions
  getTransactions: (): Transaction[] => {
    const transactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return transactions ? JSON.parse(transactions) : [];
  },

  saveTransaction: (transaction: Transaction) => {
    const transactions = storage.getTransactions();
    // Check if transaction with same ID already exists
    const existingIndex = transactions.findIndex(t => t.id === transaction.id);
    if (existingIndex >= 0) {
      // Update existing transaction
      transactions[existingIndex] = transaction;
    } else {
      // Add new transaction
      transactions.push(transaction);
    }
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }
}; 