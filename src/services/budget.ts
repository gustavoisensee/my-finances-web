import requests from './requests';
import { BudgetFormType } from '@/types/form';

export const createBudget = (budget: BudgetFormType) =>
  requests.post('/budget', budget);

export const updateBudget = (id: number, budget: BudgetFormType) =>
  requests.post(`/budget/${id}`, budget);

export const deleteBudget = (id: number) => requests.delete(`/budget/${id}`);
