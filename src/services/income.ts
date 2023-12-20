import requests from './requests';
import { IncomeFormType } from '@/types/form';

export const createIncome = (income: IncomeFormType) =>
  requests.post('/income', income);

export const updateIncome = (id: number, income: IncomeFormType) =>
  requests.post(`/income/${id}`, income);

export const deleteIncome = (id: number) => requests.delete(`/income/${id}`);
