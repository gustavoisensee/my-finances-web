import { apiClient } from '@/lib/api-client';
import { ExpenseFormType } from '@/types/form';
import { Expense } from '@/types/month';

export const createExpense = (expense: ExpenseFormType) =>
  apiClient.post<Expense>('/expense', expense);

export const updateExpense = (expense: ExpenseFormType) =>
  apiClient.put<Expense>(`/expense/${expense.id}`, expense);

export const deleteExpense = (id: number) => 
  apiClient.delete<{ id: number }>(`/expense/${id}`);
