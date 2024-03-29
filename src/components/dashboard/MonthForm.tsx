import { useMemo } from 'react';
import { useMonthForm } from '@/hooks/dashboardHooks';
import TextInput from '../form/TextInput';
import Select from '../form/Select';
import { useYears } from '@/hooks/yearHooks';
import { Month, Months } from '@/types/month';
import Divider from '../shared/Divider';
import { getError } from '@/helpers/form';
import FormButtons from '../shared/FormButtons';

type Props = {
  month?: Month;
  handleCloseModal: () => void;
}

export default function MonthForm({ month, handleCloseModal }: Props) {
  const {
    register, handleSubmit, onSubmit, errors, isSubmitting
  } = useMonthForm({ month, handleCloseModal });

  const { isFetching, years } = useYears();

  const yearOptions = useMemo(() =>
    years.map((y) => ({ value: y.id, label: y.value })), [years]);

  const months = useMemo(() =>
    Object.keys(Months).map(key => ({ value: key, label: Months[key] })), []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <Select title='Month' {...register('value')}
        error={getError(errors, 'value')} options={months} />

      <Select title='Year' {...register('yearId')}
        error={getError(errors, 'yearId')} options={yearOptions}
        disabled={isFetching} />

      <TextInput title='Description' {...register('description')}
        error={getError(errors, 'description')} />

      <Divider className='-ml-6 -mr-6' />

      <FormButtons
        isSubmitting={isSubmitting}
        handleCloseModal={handleCloseModal}
      />
    </form>
  )
}
