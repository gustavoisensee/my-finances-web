import TextInput from '../../form/TextInput';
import Divider from '../../shared/Divider';
import { useIncomeForm } from '@/hooks/incomeHooks';
import { getError } from '@/helpers/form';
import FormButtons from '../../shared/FormButtons';
import { Income } from '@/types/month';

type Props = {
  income?: Income,
  handleCloseModal: () => void;
}

export default function MonthIncomeForm({ income, handleCloseModal }: Props) {
  const {
    register, handleSubmit, onSubmit, errors, isSubmitting
  } = useIncomeForm({ income, handleCloseModal });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
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
