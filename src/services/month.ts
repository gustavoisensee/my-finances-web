import requests from './requests';
import { InputTypes } from '@/types/form';

export const getMonths = (yearId: number) =>
  requests.get(`/month?iIncomes=true&yearId=${yearId}`);

export const getMonthByIdWithAllData = (monthId: number) =>
  requests.get(`/month/${monthId}?iIncomes=true&iBudgets=true&iExpenses=true`);

export const createMonth = (month: InputTypes) =>
  requests.post('/month', month);

export const deleteMonth = (id: number) =>
  requests.delete(`/month/${id}`);