import requests from './requests';
import { ExpenseFormType } from '@/types/form';

export const createExpense = (expense: ExpenseFormType) =>
  requests.post('/api/expense', expense);

export const updateExpense = (expense: ExpenseFormType) =>
  requests.put(`/api/expense/${expense.id}`, expense);

export const deleteExpense = (id: number) => requests.delete(`/expense/${id}`);
