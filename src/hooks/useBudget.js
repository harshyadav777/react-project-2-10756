import { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';

export const useBudget = () => {
  const { budget, setMonthlyBudget, getCurrentMonthSpending, getTotalExpenses } = useFinance();

  const budgetData = useMemo(() => {
    const monthlyBudget = budget.monthlyBudget || 0;
    const currentSpending = getCurrentMonthSpending();
    const remaining = monthlyBudget - currentSpending;
    const percentageUsed = monthlyBudget > 0 ? (currentSpending / monthlyBudget) * 100 : 0;

    return {
      monthlyBudget,
      currentSpending,
      remaining,
      percentageUsed: Math.min(percentageUsed, 100),
      isOverBudget: percentageUsed > 100,
    };
  }, [budget.monthlyBudget, getCurrentMonthSpending]);

  return {
    ...budgetData,
    setMonthlyBudget,
  };
};