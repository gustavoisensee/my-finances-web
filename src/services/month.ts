import requests from './requests';
import { MonthFormType } from '@/types/form';

export const getMonths = (yearId: number) =>
  requests.get(`/api/month?iIncomes=true&yearId=${yearId}`);

export const getMonthByIdWithAllData = (monthId: number) =>
  requests.get(`/api/month/${monthId}?iIncomes=true&iBudgets=true&iExpenses=true`);

export const createMonth = (month: MonthFormType) =>
  requests.post('/api/month', month);

export const updateMonth = (month: MonthFormType) =>
  requests.put(`/api/month/${month.id}`, month);

export const deleteMonth = (id: number) =>
  requests.delete(`/api/month/${id}`);