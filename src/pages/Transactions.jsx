import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { useTransactions } from '../hooks/useTransactions';
import TransactionCard from '../components/TransactionCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';

const Transactions = () => {
  const navigate = useNavigate();
  const {
    transactions,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    resetFilters,
    deleteTransaction,
  } = useTransactions();

  const [showFilters, setShowFilters] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleEdit = (transaction) => {
    navigate(`/transactions/edit/${transaction.id}`, { state: { transaction } });
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700 }}>Transactions</h1>
        <Link
          to="/transactions/new"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            backgroundColor: '#3498DB',
            color: '#fff',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          <FaPlus /> Add Transaction
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            padding: '12px 16px',
            borderRadius: '12px',
            border: showFilters ? '1px solid #3498DB' : '1px solid #E0E0E0',
            backgroundColor: showFilters ? '#EBF5FB' : '#fff',
            color: showFilters ? '#3498DB' : '#666',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Filters
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid #E0E0E0',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="category">Sort by Category</option>
          </select>
          
          <button
            onClick={toggleSort}
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid #E0E0E0',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Filters filters={filters} setFilters={setFilters} onReset={resetFilters} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginBottom: '16px', color: '#666' }}>
        Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
      </div>

      {transactions.length === 0 ? (
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <p style={{ color: '#888', fontSize: '16px', margin: '0 0 20px 0' }}>
            No transactions found
          </p>
          <Link
            to="/transactions/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#3498DB',
              color: '#fff',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            <FaPlus /> Add Your First Transaction
          </Link>
        </div>
      ) : (
        <AnimatePresence>
          {transactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TransactionCard
                transaction={transaction}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Transactions;