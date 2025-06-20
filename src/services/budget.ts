import requests from './requests';
import { BudgetFormType } from '@/types/form';

export const createBudget = (budget: BudgetFormType) =>
  requests.post('/api/budget', budget);

export const updateBudget = (budget: BudgetFormType) =>
  requests.put(`/api/budget/${budget.id}`, budget);

export const deleteBudget = (id: number) => requests.delete(`/api/budget/${id}`);
