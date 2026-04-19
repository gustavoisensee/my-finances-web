import { useMemo } from 'react';
import { useMonths } from '@/hooks/monthHooks';
import { useCategories } from '@/hooks/categoryHooks';
import { getTotal } from '@/helpers/currency';
import { Months, Month, Budget, Expense } from '@/types/month';

export const CHART_COLORS = {
  income: '#10b981',
  expenses: '#f43f5e',
  savings: '#8b5cf6',
  budget: [
    '#06b6d4',
    '#f59e0b',
    '#ec4899',
    '#84cc16',
    '#6366f1',
    '#14b8a6',
    '#f97316',
    '#a855f7',
  ],
};

export const CHART_TOOLTIP_STYLE = {
  contentStyle: {
    backgroundColor: 'oklch(var(--b1))',
    border: '1px solid oklch(var(--b3))',
    borderRadius: '0.75rem',
  },
  labelStyle: { color: 'oklch(var(--bc))' },
  itemStyle: { color: 'oklch(var(--bc))' },
} as const;

export type BarChartDataItem = {
  name: string;
  income: number;
  expenses: number;
};

export type LineChartDataItem = {
  name: string;
  income: number;
  expenses: number;
  savings: number;
};

export type PieChartDataItem = {
  name: string;
  value: number;
};

export const useReports = () => {
  const { data, isFetching, error } = useMonths(true, true);
  const { data: categories, isFetching: isFetchingCategories } = useCategories();

  // Create a map for quick category lookup
  const categoryMap = useMemo(() => {
    const map = new Map<number, string>();
    categories.forEach((category) => {
      map.set(category.id, category.name);
    });
    return map;
  }, [categories]);

  // Calculate total income
  const totalIncome = useMemo(() => {
    if (!data) return 0;
    return data.reduce((acc, month) => acc + getTotal(month.incomes || []), 0);
  }, [data]);

  // Calculate total expenses
  const totalExpenses = useMemo(() => {
    if (!data) return 0;
    return data.reduce((acc, month) => {
      const budgets = month.budgets || [];
      const monthExpenses = budgets.reduce((budgetAcc, budget) => {
        return budgetAcc + getTotal(budget.expenses || []);
      }, 0);
      return acc + monthExpenses;
    }, 0);
  }, [data]);

  // Calculate net savings
  const netSavings = useMemo(() => {
    return totalIncome - totalExpenses;
  }, [totalIncome, totalExpenses]);

  // Calculate total budgets count
  const totalBudgets = useMemo(() => {
    if (!data) return 0;
    return data.reduce((acc, month) => acc + (month.budgets?.length || 0), 0);
  }, [data]);

  const monthOrder = useMemo(() => Object.values(Months), []);

  const { barChartData, lineChartData } = useMemo(() => {
    if (!data) return { barChartData: [] as BarChartDataItem[], lineChartData: [] as LineChartDataItem[] };

    const bar: BarChartDataItem[] = [];
    const line: LineChartDataItem[] = [];

    for (const month of data) {
      const income = getTotal(month.incomes || []);
      const budgets = month.budgets || [];
      const expenses = budgets.reduce((acc, budget) => acc + getTotal(budget.expenses || []), 0);
      const fullName = Months[month.description] || month.description;

      bar.push({ name: fullName, income, expenses });
      line.push({
        name: fullName.substring(0, 3),
        income,
        expenses,
        savings: income - expenses,
      });
    }

    bar.sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));
    const shortOrder = monthOrder.map(m => m.substring(0, 3));
    line.sort((a, b) => shortOrder.indexOf(a.name) - shortOrder.indexOf(b.name));

    return { barChartData: bar, lineChartData: line };
  }, [data, monthOrder]);

  // Prepare data for Category Distribution Pie Chart
  const pieChartData = useMemo<PieChartDataItem[]>(() => {
    if (!data) return [];
    const categoryTotals = new Map<number | undefined, number>();
    
    // Collect all expenses and group by categoryId
    data.forEach((month: Month) => {
      const budgets = month.budgets || [];
      budgets.forEach((budget: Budget) => {
        const expenses = budget.expenses || [];
        expenses.forEach((expense: Expense) => {
          const categoryId = expense.categoryId;
          const current = categoryTotals.get(categoryId) || 0;
          categoryTotals.set(categoryId, current + expense.value);
        });
      });
    });

    // Map category IDs to names
    return Array.from(categoryTotals.entries())
      .map(([categoryId, value]) => ({
        name: categoryId ? (categoryMap.get(categoryId) || 'Unknown Category') : 'Uncategorized',
        value,
      }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [data, categoryMap]);

  // Check if we have data to display
  const isLoading = isFetching || isFetchingCategories;
  const hasData = !isLoading && data && data.length > 0;
  const isEmpty = !isLoading && data?.length === 0;

  return {
    // State
    isFetching: isLoading,
    error,
    hasData,
    isEmpty,
    // Summary data
    totalIncome,
    totalExpenses,
    netSavings,
    totalBudgets,
    // Chart data
    barChartData,
    lineChartData,
    pieChartData,
  };
};

