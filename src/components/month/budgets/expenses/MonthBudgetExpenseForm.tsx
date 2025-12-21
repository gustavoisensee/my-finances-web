import { useEffect, useMemo } from 'react';

import TextInput from '../../../form/TextInput';
import Divider from '../../../shared/Divider';
import { useExpenseForm } from '@/hooks/expenseHooks';
import { getError } from '@/helpers/form';
import FormButtons from '../../../shared/FormButtons';
import { useCategories } from '@/hooks/categoryHooks';
import Select from '../../../form/Select';
import { Expense } from '@/types/month';

type Props = {
  expense?: Expense,
  budgetId: number;
  budgetName?: string;
  handleCloseModal: () => void;
}

export default function MonthBudgetExpenseForm({ expense, budgetId, budgetName, handleCloseModal }: Props) {
  const {
    register, handleSubmit, onSubmit, errors, isSubmitting, setValue, watch
  } = useExpenseForm({ expense, budgetId, budgetName, handleCloseModal });

  const { isFetching, data: categories } = useCategories();
  const currentCategoryId = watch('categoryId');

  // Pre-select first category when adding new expense
  useEffect(() => {
    if (!expense && categories.length > 0 && !currentCategoryId) {
      setValue('categoryId', categories[0].id);
    }
  }, [expense, categories, currentCategoryId, setValue]);

  const categoryOptions = useMemo(() =>
    categories.map((y) => ({ value: y.id, label: y.name })), [categories]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <Select
        {...register('categoryId', { valueAsNumber: true })}
        title='Category'
        error={getError(errors, 'categoryId')}
        options={categoryOptions}
        disabled={isFetching} />

      <TextInput
        {...register('description')}
        title='Description'
        error={getError(errors, 'description')}
      />

      <TextInput
        {...register('value')}
        type='number'
        title='Cost'
        error={getError(errors, 'value')}
      />

      <Divider className='-ml-6 -mr-6' />

      <FormButtons
        handleCloseModal={handleCloseModal}
        isSubmitting={isSubmitting}
      />
    </form>
  )
}
