import requests from './requests';

export const getYears = () => requests.get('/api/year');