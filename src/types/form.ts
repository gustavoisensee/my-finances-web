import { FieldValues } from 'react-hook-form';

export type Option = {
  value: string | number;
  label: string | number;
};

export interface MonthFormType extends FieldValues {
  id?: number;
  value: number;
  description?: string;
  createdAt: string;
  yearId: number;
};

export interface BudgetFormType extends FieldValues {
  id?: number;
  value: number;
  description: string;
  createdAt: string;
  monthId: number;
};

export interface IncomeFormType extends FieldValues {
  id?: number;
  value: number;
  description: string;
  createdAt: string;
  monthId: number;
};

export interface ExpenseFormType extends FieldValues {
  id?: number,
  value: number;
  description: string;
  createdAt: string;
  budgetId: number;
  categoryId?: number;
};