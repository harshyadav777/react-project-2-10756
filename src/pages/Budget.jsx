import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBudget } from '../hooks/useBudget';
import { formatCurrency } from '../utils/currencyFormatter';
import BudgetCard from '../components/BudgetCard';

const Budget = () => {
  const { monthlyBudget, currentSpending, remaining, percentageUsed, isOverBudget, setMonthlyBudget } = useBudget();
  const [editBudget, setEditBudget] = useState(monthlyBudget);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setMonthlyBudget(editBudget);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}
    >
      <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: 700 }}>Budget</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <BudgetCard
          monthlyBudget={monthlyBudget}
          currentSpending={currentSpending}
          remaining={remaining}
          percentageUsed={percentageUsed}
          isOverBudget={isOverBudget}
        />

        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>Set Monthly Budget</h3>

          {!isEditing ? (
            <div>
              <p style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: 700, color: '#333' }}>
                {formatCurrency(monthlyBudget)}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1px solid #3498DB',
                  backgroundColor: '#fff',
                  color: '#3498DB',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Edit Budget
              </button>
            </div>
          ) : (
            <div>
              <input
                type="number"
                value={editBudget}
                onChange={(e) => setEditBudget(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #E0E0E0',
                  fontSize: '16px',
                  marginBottom: '16px',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleSave}
                  style={{
                    flex: 1,
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#3498DB',
                    color: '#fff',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditBudget(monthlyBudget);
                    setIsEditing(false);
                  }}
                  style={{
                    flex: 1,
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1px solid #E0E0E0',
                    backgroundColor: '#fff',
                    color: '#666',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          marginTop: '24px',
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}
      >
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>Budget Tips</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#666', lineHeight: 1.8 }}>
          <li>Set a realistic budget based on your actual income and expenses</li>
          <li>Track your spending regularly to stay on budget</li>
          <li>Review and adjust your budget monthly if needed</li>
          <li>Set aside savings before spending on wants</li>
          <li>Look for areas where you can cut back if needed</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Budget;