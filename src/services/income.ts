import requests from './requests';
import { IncomeFormType } from '@/types/form';

export const createIncome = (income: IncomeFormType) =>
  requests.post('/income', income);

export const updateIncome = (income: IncomeFormType) =>
  requests.put(`/income/${income.id}`, income);

export const deleteIncome = (id: number) => requests.delete(`/income/${id}`);
