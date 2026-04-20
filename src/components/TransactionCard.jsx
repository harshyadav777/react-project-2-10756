import { FaEdit, FaTrash, FaRedo } from 'react-icons/fa';
import { format } from 'date-fns';
import { formatCurrency } from '../utils/currencyFormatter';

const categoryColors = {
  Food: '#FF6B6B',
  Travel: '#4ECDC4',
  Rent: '#45B7D1',
  Shopping: '#96CEB4',
  Entertainment: '#FFEAA7',
  Health: '#DDA0DD',
  Utilities: '#98D8C8',
  Subscriptions: '#F7DC6F',
  Salary: '#82E0AA',
  Investment: '#85C1E9',
  Other: '#D5DBDB',
};

const TransactionCard = ({ transaction, onEdit, onDelete }) => {
  const { id, title, amount, category, date, type, notes, recurring } = transaction;

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeft: `4px solid ${type === 'income' ? '#2ECC71' : (categoryColors[category] || '#D5DBDB')}`,
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{title}</h3>
          {recurring && (
            <span style={{ color: '#F39C12', fontSize: '12px' }}>
              <FaRedo />
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '12px', color: '#666', fontSize: '13px' }}>
          <span>{category}</span>
          <span>|</span>
          <span>{format(new Date(date), 'MMM dd, yyyy')}</span>
        </div>
        {notes && (
          <p style={{ margin: '4px 0 0', color: '#888', fontSize: '12px' }}>{notes}</p>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: type === 'income' ? '#2ECC71' : '#E74C3C',
          }}
        >
          {type === 'income' ? '+' : '-'}{formatCurrency(amount)}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onEdit(transaction)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#3498DB',
              padding: '8px',
              borderRadius: '8px',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.background = '#EBF5FB')}
            onMouseOut={(e) => (e.target.style.background = 'none')}
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#E74C3C',
              padding: '8px',
              borderRadius: '8px',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.background = '#FDEDEC')}
            onMouseOut={(e) => (e.target.style.background = 'none')}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;