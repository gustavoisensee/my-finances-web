import { apiClient } from '@/lib/api-client';
import { MonthFormType } from '@/types/form';
import { Month } from '@/types/month';

export const getMonths = (yearId: number) =>
  apiClient.get<Month[]>(`/month?iIncomes=true&yearId=${yearId}`);

export const getMonthByIdWithAllData = (monthId: number) =>
  apiClient.get<Month>(`/month/${monthId}?iIncomes=true&iBudgets=true&iExpenses=true`);

export const createMonth = (month: MonthFormType) =>
  apiClient.post<Month>('/month', month);

export const updateMonth = (month: MonthFormType) =>
  apiClient.put<Month>(`/month/${month.id}`, month);

export const deleteMonth = (id: number) =>
  apiClient.delete<{ id: number }>(`/month/${id}`);
