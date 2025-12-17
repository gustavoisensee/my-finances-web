import { apiClient } from '@/lib/api-client';
import { BudgetFormType } from '@/types/form';
import { Budget } from '@/types/month';

export const createBudget = (budget: BudgetFormType) =>
  apiClient.post<Budget>('/budget', budget);

export const updateBudget = (budget: BudgetFormType) =>
  apiClient.put<Budget>(`/budget/${budget.id}`, budget);

export const deleteBudget = (id: number) => 
  apiClient.delete<{ id: number }>(`/budget/${id}`);

export const reorderBudgets = (monthId: number, budgetIds: number[]) =>
  apiClient.put<void>('/budget/reorder', { monthId, budgetIds });
