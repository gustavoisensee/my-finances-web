import { apiClient } from '@/lib/api-client';
import { IncomeFormType } from '@/types/form';

export const createIncome = (income: IncomeFormType) =>
  apiClient.post('/income', income);

export const updateIncome = (income: IncomeFormType) =>
  apiClient.put(`/income/${income.id}`, income);

export const deleteIncome = (id: number) => 
  apiClient.delete(`/income/${id}`);
