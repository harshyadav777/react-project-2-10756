import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCurrency = () => {
  const [rates, setRates] = useState({ USD: 1, INR: 83.12, EUR: 0.92, GBP: 0.79 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://api.exchangerate-api.com/v4/latest/USD'
        );
        setRates(response.data.rates);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch exchange rates:', err);
        setError('Failed to fetch exchange rates');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const convert = (amount, fromCurrency, toCurrency) => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return amount;
    const inUSD = amount / rates[fromCurrency];
    return inUSD * rates[toCurrency];
  };

  const formatWithCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return {
    rates,
    loading,
    error,
    convert,
    formatWithCurrency,
    availableCurrencies: Object.keys(rates),
  };
};