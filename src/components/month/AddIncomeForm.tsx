import TextInput from '../form/TextInput';
import Divider from '../shared/Divider';
import { useAddIncomeForm } from '@/hooks/incomeHooks';
import { getError } from '@/helpers/form';
import FormButtons from '../shared/FormButtons';

type Props = {
  onClickClose: () => void;
}

export default function AddBudgetForm({ onClickClose }: Props) {
  const {
    register, handleSubmit, onSubmit, errors, isSubmitting
  } = useAddIncomeForm({ onClickClose });

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
        onClickClose={onClickClose}
        isSubmitting={isSubmitting}
      />
    </form>
  )
}
