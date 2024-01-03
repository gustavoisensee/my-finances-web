import requests from './requests';
import { ExpenseFormType } from '@/types/form';

export const createExpense = (expense: ExpenseFormType) =>
  requests.post('/expense', expense);

export const updateExpense = (id: number, expense: ExpenseFormType) =>
  requests.put(`/expense/${id}`, expense);

export const deleteExpense = (id: number) => requests.delete(`/expense/${id}`);
