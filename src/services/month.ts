import requests from './requests';
import { MonthFormType } from '@/types/form';

export const getMonths = (yearId: number) =>
  requests.get(`/month?iIncomes=true&yearId=${yearId}`);

export const getMonthByIdWithAllData = (monthId: number) =>
  requests.get(`/month/${monthId}?iIncomes=true&iBudgets=true&iExpenses=true`);

export const createMonth = (month: MonthFormType) =>
  requests.post('/month', month);

export const updateMonth = (month: MonthFormType) =>
  requests.put(`/month/${month.id}`, month);

export const deleteMonth = (id: number) =>
  requests.delete(`/month/${id}`);