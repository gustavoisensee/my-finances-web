export type Income = {
  value: number;
}

export type Budget = {
  name: string;
  value: number;
}

export type Month = {
  id: number,
  value: number;
  notes: string;
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