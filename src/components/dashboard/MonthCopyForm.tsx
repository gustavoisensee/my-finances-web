import { useMemo } from 'react';
import { useMonthCopyForm } from '@/hooks/dashboardHooks';
import Select from '../form/Select';
import { useYears } from '@/hooks/yearHooks';
import { Month, Months } from '@/types/month';
import Divider from '../shared/Divider';
import { getError } from '@/helpers/form';

type Props = {
  month: Month;
  handleCloseModal: () => void;
}

export default function MonthCopyForm({ month, handleCloseModal }: Props) {
  const {
    register, handleSubmit, onSubmit, errors, isSubmitting
  } = useMonthCopyForm({ month, handleCloseModal });

  const { isFetching, years } = useYears();

  const yearOptions = useMemo(() =>
    years.map((y) => ({ value: y.id, label: y.value })), [years]);

  const monthOptions = useMemo(() =>
    Object.keys(Months).map(key => ({ value: key, label: Months[key] })), []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <div className='alert alert-indigo mb-4 text-sm'>
        <div>
          <p>This will copy the month, its incomes, and budgets.</p>
          <p className='mt-1'><strong>Note:</strong> Expenses will <strong>not</strong> be copied.</p>
        </div>
      </div>
      <Select
        title='Year'
        {...register('yearId')}
        error={getError(errors, 'yearId')}
        options={yearOptions}
        disabled={isFetching}
      />
      <Select
        title='Month'
        {...register('value')}
        error={getError(errors, 'value')}
        options={monthOptions}
      />

      <Divider className='-ml-6 -mr-6' />

      <div className='flex'>
        <button
          className='btn btn-primary'
          type={isSubmitting ? 'button' : 'submit'}
          disabled={isSubmitting}
        >
          {isSubmitting && <span className='loading loading-spinner' />}
          Copy
        </button>
        <button
          className='btn ml-2'
          type='button'
          onClick={!isSubmitting ? handleCloseModal : undefined}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

