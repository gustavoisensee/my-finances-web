import TextInput from '../form/TextInput';
import Divider from '../shared/Divider';
import { useAddBudgetForm } from '@/hooks/budgetHooks';
import { getError } from '@/helpers/form';

type Props = {
  onClickClose: () => void;
}

export default function AddBudgetForm({ onClickClose }: Props) {
  const {
    register, handleSubmit, onSubmit, errors, isSubmitting
  } = useAddBudgetForm({ onClickClose });

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

      <div className='flex'>
        <button className='btn btn-primary' type={isSubmitting ? 'button' : 'submit'}>
          {isSubmitting && <span className='loading loading-spinner' />}
          Submit
        </button>
        <button className='btn ml-2' onClick={!isSubmitting ? onClickClose : undefined}>
          Close
        </button>
      </div>
    </form>
  )
}
