import currency from 'currency.js';

import { Budget, Expense, Income } from '@/types/month';

export const getTotal = (array: Budget[] | Income[] | Expense[]): number =>
  array?.reduce((p, c) => p + c.value, 0) || 0;

export const euro = (value: number) => currency(value, { symbol: '€', decimal: ',', separator: '.' }).format();