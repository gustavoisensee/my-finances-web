import requests from './requests';

export const getMonths = (yearId: number) =>
  requests.get(`/month?iIncomes=true&yearId=${yearId}`);

export const getMonthByIdWithAllData = (monthId: number) =>
  requests.get(`/month/${monthId}?iIncomes=true&iBudgets=true&iExpenses=true`);