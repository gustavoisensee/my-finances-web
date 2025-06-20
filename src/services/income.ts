import requests from './requests';
import { IncomeFormType } from '@/types/form';

export const createIncome = (income: IncomeFormType) =>
  requests.post('/api/income', income);

export const updateIncome = (income: IncomeFormType) =>
  requests.put(`/api/income/${income.id}`, income);

export const deleteIncome = (id: number) => requests.delete(`/api/income/${id}`);
