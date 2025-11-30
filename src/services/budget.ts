import { apiClient } from '@/lib/api-client';
import { BudgetFormType } from '@/types/form';

export const createBudget = (budget: BudgetFormType) =>
  apiClient.post('/budget', budget);

export const updateBudget = (budget: BudgetFormType) =>
  apiClient.put(`/budget/${budget.id}`, budget);

export const deleteBudget = (id: number) => 
  apiClient.delete(`/budget/${id}`);
