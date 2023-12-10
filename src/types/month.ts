export type Income = {
  description: string;
  value: number;
}

export type Expense = {
  description: string;
  value: number;
}

export type Budget = {
  description: string;
  value: number;
  expenses: Expense[];
}

export type Month = {
  id: number,
  description: string;
  value: number;
  incomes: Income[];
  budgets: Budget[]
}

export const Months = {
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