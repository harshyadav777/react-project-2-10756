import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FinanceContext = createContext();

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('budget');
    return saved ? JSON.parse(saved) : { monthlyBudget: 50000 };
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [budget]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [...prev, newTransaction]);
    return newTransaction;
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction = (id, updates) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const setMonthlyBudget = (amount) => {
    setBudget({ monthlyBudget: amount });
  };

  const getTotalIncome = () => {
    return transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  };

  const getTotalExpenses = () => {
    return transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  };

  const getNetBalance = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  const getSpendingByCategory = () => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const categoryMap = {};
    
    expenses.forEach((t) => {
      const cat = t.category || 'Other';
      categoryMap[cat] = (categoryMap[cat] || 0) + Number(t.amount);
    });
    
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  };

  const getTopSpendingCategory = () => {
    const byCategory = getSpendingByCategory();
    if (byCategory.length === 0) return null;
    return byCategory.reduce((max, cat) => 
      cat.value > max.value ? cat : max
    , byCategory[0]);
  };

  const getCurrentMonthSpending = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return transactions
      .filter((t) => {
        const d = new Date(t.date);
        return t.type === 'expense' && 
               d.getMonth() === currentMonth && 
               d.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + Number(t.amount), 0);
  };

  const getRecurringTransactions = () => {
    return transactions.filter((t) => t.recurring);
  };

  const value = {
    transactions,
    budget,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    setMonthlyBudget,
    getTotalIncome,
    getTotalExpenses,
    getNetBalance,
    getSpendingByCategory,
    getTopSpendingCategory,
    getCurrentMonthSpending,
    getRecurringTransactions,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};