import requests from './requests';

export const getMonths = () => requests.get('/month?iIncomes=true');

export const getMonthByIdWithAllData = (monthId: number) =>
  requests.get(`/month/${monthId}?iIncomes=true&iBudgets=true&iExpenses=true`);