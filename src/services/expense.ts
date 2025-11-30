import { apiClient } from '@/lib/api-client';
import { ExpenseFormType } from '@/types/form';

export const createExpense = (expense: ExpenseFormType) =>
  apiClient.post('/expense', expense);

export const updateExpense = (expense: ExpenseFormType) =>
  apiClient.put(`/expense/${expense.id}`, expense);

export const deleteExpense = (id: number) => 
  apiClient.delete(`/expense/${id}`);
