import { Budget } from '@/types/month';

export const getTotals = (budgets: Budget[]) => {
  let totalExpenses = 0;
  let totalBudgets = 0;
  budgets?.forEach(b => {
    totalBudgets += b.value;
    b.expenses?.forEach(e => {
      totalExpenses += e.value;
    });
  });

  return {
    totalBudgets,
    totalExpenses
  }
};

