import { useState, useEffect, useCallback, useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { useDebounce } from './useDebounce';

export const useTransactions = () => {
  const { transactions, addTransaction, deleteTransaction, updateTransaction } = useFinance();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    startDate: '',
    endDate: '',
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          (t.notes && t.notes.toLowerCase().includes(query))
      );
    }

    if (filters.category) {
      result = result.filter((t) => t.category === filters.category);
    }

    if (filters.type) {
      result = result.filter((t) => t.type === filters.type);
    }

    if (filters.startDate) {
      result = result.filter((t) => new Date(t.date) >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      result = result.filter((t) => new Date(t.date) <= new Date(filters.endDate));
    }

    result.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case 'date':
          aVal = new Date(a.date).getTime();
          bVal = new Date(b.date).getTime();
          break;
        case 'amount':
          aVal = Number(a.amount);
          bVal = Number(b.amount);
          break;
        case 'category':
          aVal = a.category || '';
          bVal = b.category || '';
          break;
        default:
          aVal = new Date(a.date).getTime();
          bVal = new Date(b.date).getTime();
      }

      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return result;
  }, [transactions, debouncedSearch, filters, sortBy, sortOrder]);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setFilters({
      category: '',
      type: '',
      startDate: '',
      endDate: '',
    });
    setSortBy('date');
    setSortOrder('desc');
  }, []);

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    resetFilters,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  };
};