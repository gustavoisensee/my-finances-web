import { FieldErrors, FieldValues } from 'react-hook-form';

export const getError = <T extends FieldValues>(errors: FieldErrors<T>, value: string): string => {
  const error = errors?.[value];
  if (error && typeof error === 'object' && 'message' in error) {
    return (error.message as string) || '';
  }
  return '';
};