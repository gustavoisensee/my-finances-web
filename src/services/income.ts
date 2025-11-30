import { apiClient } from '@/lib/api-client';
import { IncomeFormType } from '@/types/form';
import { Income } from '@/types/month';

export const createIncome = (income: IncomeFormType) =>
  apiClient.post<Income>('/income', income);

export const updateIncome = (income: IncomeFormType) =>
  apiClient.put<Income>(`/income/${income.id}`, income);

export const deleteIncome = (id: number) => 
  apiClient.delete<{ id: number }>(`/income/${id}`);
