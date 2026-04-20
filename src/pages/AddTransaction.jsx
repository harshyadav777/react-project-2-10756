import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { useFinance } from '../context/FinanceContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categories = [
  'Food',
  'Travel',
  'Rent',
  'Shopping',
  'Entertainment',
  'Health',
  'Utilities',
  'Subscriptions',
  'Salary',
  'Investment',
  'Other',
];

const schema = yup.object({
  title: yup.string().required('Title is required'),
  amount: yup
    .number()
    .positive('Amount must be positive')
    .required('Amount is required')
    .typeError('Amount must be a number'),
  category: yup.string().required('Category is required'),
  type: yup.string().required('Type is required'),
  date: yup.string().required('Date is required'),
  notes: yup.string(),
}).required();

const AddTransaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addTransaction, updateTransaction } = useFinance();
  
  const editingTransaction = location.state?.transaction;
  const isEditing = !!editingTransaction;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      amount: '',
      category: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      recurring: false,
    },
  });

  useEffect(() => {
    if (editingTransaction) {
      setValue('title', editingTransaction.title);
      setValue('amount', editingTransaction.amount);
      setValue('category', editingTransaction.category);
      setValue('type', editingTransaction.type);
      setValue('date', editingTransaction.date);
      setValue('notes', editingTransaction.notes || '');
      setValue('recurring', editingTransaction.recurring || false);
    }
  }, [editingTransaction, setValue]);

  const onSubmit = (data) => {
    try {
      if (isEditing) {
        updateTransaction(editingTransaction.id, data);
        toast.success('Transaction updated successfully');
      } else {
        addTransaction(data);
        toast.success('Transaction added successfully');
      }
      reset();
      setTimeout(() => navigate('/transactions'), 1500);
    } catch (error) {
      toast.error('Failed to save transaction');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: '#666',
          cursor: 'pointer',
          marginBottom: '16px',
          padding: 0,
        }}
      >
        <FaArrowLeft /> Back
      </button>

      <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: 700 }}>
        {isEditing ? 'Edit Transaction' : 'Add Transaction'}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
            Transaction Type
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <label
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #E74C3C',
                backgroundColor: '#FDEDEC',
                color: '#E74C3C',
                cursor: 'pointer',
              }}
            >
              <input type="radio" value="expense" {...register('type')} style={{ display: 'none' }} />
              <span style={{ fontWeight: 600 }}>Expense</span>
            </label>
            <label
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #2ECC71',
                backgroundColor: '#E8F8F0',
                color: '#2ECC71',
                cursor: 'pointer',
              }}
            >
              <input type="radio" value="income" {...register('type')} style={{ display: 'none' }} />
              <span style={{ fontWeight: 600 }}>Income</span>
            </label>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
            Title *
          </label>
          <input
            {...register('title')}
            placeholder="e.g., Monthly rent, Lunch"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: errors.title ? '1px solid #E74C3C' : '1px solid #E0E0E0',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {errors.title && (
            <p style={{ color: '#E74C3C', fontSize: '12px', margin: '4px 0 0' }}>
              {errors.title.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
            Amount *
          </label>
          <input
            {...register('amount')}
            type="number"
            step="0.01"
            placeholder="0.00"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: errors.amount ? '1px solid #E74C3C' : '1px solid #E0E0E0',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {errors.amount && (
            <p style={{ color: '#E74C3C', fontSize: '12px', margin: '4px 0 0' }}>
              {errors.amount.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
            Category *
          </label>
          <select
            {...register('category')}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: errors.category ? '1px solid #E74C3C' : '1px solid #E0E0E0',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
            }}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p style={{ color: '#E74C3C', fontSize: '12px', margin: '4px 0 0' }}>
              {errors.category.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
            Date *
          </label>
          <input
            {...register('date')}
            type="date"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: errors.date ? '1px solid #E74C3C' : '1px solid #E0E0E0',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {errors.date && (
            <p style={{ color: '#E74C3C', fontSize: '12px', margin: '4px 0 0' }}>
              {errors.date.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
            Notes
          </label>
          <textarea
            {...register('notes')}
            placeholder="Add any additional notes..."
            rows={3}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #E0E0E0',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input
              {...register('recurring')}
              type="checkbox"
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <span style={{ fontWeight: 500, color: '#333' }}>Mark as recurring expense</span>
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#3498DB',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          {isEditing ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </form>
    </motion.div>
  );
};

export default AddTransaction;