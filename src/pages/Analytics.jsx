import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useFinance } from '../context/FinanceContext';
import { SpendingPieChart, MonthlyTrendChart, IncomeExpenseChart } from '../components/Charts';

const Analytics = () => {
  const { transactions, getTotalIncome, getTotalExpenses, getSpendingByCategory } = useFinance();

  const monthlyData = useMemo(() => {
    const monthlyMap = {};
    
    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = { month: monthKey, income: 0, expenses: 0 };
      }
      
      if (t.type === 'income') {
        monthlyMap[monthKey].income += Number(t.amount);
      } else {
        monthlyMap[monthKey].expenses += Number(t.amount);
      }
    });
    
    const sorted = Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month));
    const last6months = sorted.slice(-6);
    
    return last6months;
  }, [transactions]);

  const chartData = useMemo(() => {
    return {
      spendingByCategory: getSpendingByCategory(),
      monthly: monthlyData,
    };
  }, [getSpendingByCategory, monthlyData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}
    >
      <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: 700 }}>Analytics</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Total Income</h3>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#2ECC71' }}>
            ₹{getTotalIncome().toLocaleString('en-IN')}
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Total Expenses</h3>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: '#E74C3C' }}>
            ₹{getTotalExpenses().toLocaleString('en-IN')}
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Net Savings</h3>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: getTotalIncome() - getTotalExpenses() >= 0 ? '#3498DB' : '#E74C3C' }}>
            ₹{(getTotalIncome() - getTotalExpenses()).toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Spending by Category</h3>
          <SpendingPieChart data={chartData.spendingByCategory} />
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Monthly Trend</h3>
          <MonthlyTrendChart data={chartData.monthly} />
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Income vs Expenses</h3>
          <IncomeExpenseChart data={chartData.monthly} />
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;