import { formatCurrency } from '../utils/currencyFormatter';

const BudgetCard = ({ monthlyBudget, currentSpending, remaining, percentageUsed, isOverBudget }) => {
  const getProgressColor = () => {
    if (percentageUsed >= 100) return '#E74C3C';
    if (percentageUsed >= 80) return '#F39C12';
    return '#2ECC71';
  };

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600, color: '#333' }}>
        Monthly Budget
      </h3>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#666', fontSize: '14px' }}>Spent</span>
          <span style={{ fontWeight: 600, fontSize: '14px' }}>
            {formatCurrency(currentSpending)} / {formatCurrency(monthlyBudget)}
          </span>
        </div>

        <div
          style={{
            height: '12px',
            backgroundColor: '#E8E8E8',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.min(percentageUsed, 100)}%`,
              backgroundColor: getProgressColor(),
              borderRadius: '6px',
              transition: 'width 0.3s ease, background-color 0.3s ease',
            }}
          />
        </div>

        <div style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>
          {percentageUsed.toFixed(1)}% used
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          paddingTop: '16px',
          borderTop: '1px solid #E8E8E8',
        }}
      >
        <div>
          <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#888' }}>Remaining</p>
          <p
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 700,
              color: isOverBudget ? '#E74C3C' : '#2ECC71',
            }}
          >
            {formatCurrency(remaining)}
          </p>
        </div>
        <div>
          <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#888' }}>Budget</p>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#333' }}>
            {formatCurrency(monthlyBudget)}
          </p>
        </div>
      </div>

      {isOverBudget && (
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#FDEDEC',
            borderRadius: '8px',
            color: '#E74C3C',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          You've exceeded your monthly budget by {formatCurrency(Math.abs(remaining))}!
        </div>
      )}
    </div>
  );
};

export default BudgetCard;