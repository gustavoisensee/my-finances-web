export type Income = {
  id?: number;
  description: string;
  value: number;
  createdAt: string;
}

export type Expense = {
  id?: number;
  description: string;
  value: number;
  createdAt: string;
  categoryId?: number;
}

export type Budget = {
  id?: number;
  description: string;
  value: number;
  createdAt: string;
  expenses: Expense[];
}

export type Month = {
  id: number,
  description: string;
  value: number;
  incomes: Income[];
  budgets: Budget[]
}

type MonthsType = {
  [x: string]: string;
}

export const Months: MonthsType = {
  '1': 'January',
  '2': 'February',
  '3': 'March',
  '4': 'April',
  '5': 'May',
  '6': 'June',
  '7': 'July',
  '8': 'August',
  '9': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}