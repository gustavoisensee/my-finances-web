import requests from './requests';

export const getCategories = () => requests.get('/api/category');