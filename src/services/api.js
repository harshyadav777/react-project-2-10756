import axios from 'axios';

const CURRENCY_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

export const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(CURRENCY_API_URL);
    return response.data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    const rates = await fetchExchangeRates();
    if (!rates[fromCurrency] || !rates[toCurrency]) {
      throw new Error('Invalid currency');
    }
    const inUSD = amount / rates[fromCurrency];
    return inUSD * rates[toCurrency];
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
};

export const fetchFinancialNews = async () => {
  console.log('Financial News API - Optional feature not implemented');
  return [];
};