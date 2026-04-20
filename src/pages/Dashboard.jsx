import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaWallet, FaChartLine, FaMoneyBillWave, FaExclamationTriangle } from 'react-icons/fa';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/currencyFormatter';
import { SpendingPieChart } from '../components/Charts';

const Dashboard = () => {
  const {
    getTotalIncome,
    getTotalExpenses,
    getNetBalance,
    getSpendingByCategory,
    getTopSpendingCategory,
    getRecurringTransactions,
  } = useFinance();

  const stats = useMemo(() => ({
    totalIncome: getTotalIncome(),
    totalExpenses: getTotalExpenses(),
    netBalance: getNetBalance(),
    spendingByCategory: getSpendingByCategory(),
    topCategory: getTopSpendingCategory(),
    recurring: getRecurringTransactions(),
  }), [getTotalIncome, getTotalExpenses, getNetBalance, getSpendingByCategory, getTopSpendingCategory, getRecurringTransactions]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700 }}>Dashboard</h1>
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
            transition: 'background-color 0.2s',
          }}
        >
          <FaPlus /> Add Transaction
        </Link>
      </div>

      <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: '#E8F8F0', borderRadius: '12px', color: '#2ECC71' }}>
              <FaWallet size={20} />
            </div>
            <span style={{ color: '#666', fontSize: '14px' }}>Total Income</span>
          </div>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#2ECC71' }}>
            {formatCurrency(stats.totalIncome)}
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: '#FDEDEC', borderRadius: '12px', color: '#E74C3C' }}>
              <FaMoneyBillWave size={20} />
            </div>
            <span style={{ color: '#666', fontSize: '14px' }}>Total Expenses</span>
          </div>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#E74C3C' }}>
            {formatCurrency(stats.totalExpenses)}
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: '#EBF5FB', borderRadius: '12px', color: '#3498DB' }}>
              <FaChartLine size={20} />
            </div>
            <span style={{ color: '#666', fontSize: '14px' }}>Net Balance</span>
          </div>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: stats.netBalance >= 0 ? '#3498DB' : '#E74C3C' }}>
            {formatCurrency(stats.netBalance)}
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: '#FEF9E7', borderRadius: '12px', color: '#F39C12' }}>
              <FaExclamationTriangle size={20} />
            </div>
            <span style={{ color: '#666', fontSize: '14px' }}>Top Category</span>
          </div>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#333' }}>
            {stats.topCategory ? `${stats.topCategory.name} (${formatCurrency(stats.topCategory.value)})` : '-'}
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Spending by Category</h3>
          <SpendingPieChart data={stats.spendingByCategory} />
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Recurring Expenses</h3>
          {stats.recurring.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center', padding: '40px' }}>No recurring expenses</p>
          ) : (
            <div>
              {stats.recurring.slice(0, 5).map((t, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: i < stats.recurring.length - 1 ? '1px solid #E8E8E8' : 'none',
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: 500 }}>{t.title}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{t.category}</p>
                  </div>
                  <p style={{ margin: 0, fontWeight: 600, color: '#E74C3C' }}>{formatCurrency(t.amount)}</p>
                </div>
              ))}
              {stats.recurring.length > 5 && (
                <Link to="/transactions" style={{ display: 'block', textAlign: 'center', marginTop: '12px', color: '#3498DB' }}>
                  View all ({stats.recurring.length})
                </Link>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;