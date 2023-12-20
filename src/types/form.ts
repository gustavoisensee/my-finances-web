import { FieldValues } from 'react-hook-form';

export type Option = {
  value: string | number;
  label: string | number;
};

export type MonthFormType = {
  value: number;
  description?: string;
  createdAt: string;
  yearId: number;
};

export interface BudgetFormType extends FieldValues {
  value: number;
  description: string;
  createdAt: string;
  monthId: number;
};