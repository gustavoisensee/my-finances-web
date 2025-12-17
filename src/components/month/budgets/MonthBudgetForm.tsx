import TextInput from '../../form/TextInput';
import ColorPicker from '../../form/ColorPicker';
import Divider from '../../shared/Divider';
import { useBudgetForm } from '@/hooks/budgetHooks';
import { getError } from '@/helpers/form';
import FormButtons from '../../shared/FormButtons';
import { Budget } from '@/types/month';

type Props = {
  budget?: Budget,
  handleCloseModal: () => void;
}

export default function MonthBudgetForm({ budget, handleCloseModal }: Props) {
  const {
    register, handleSubmit, onSubmit, errors, isSubmitting, color, setColor
  } = useBudgetForm({ budget, handleCloseModal });

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

      <ColorPicker
        value={color}
        onChange={setColor}
        title='Color'
      />

      <Divider className='-ml-6 -mr-6' />

      <FormButtons
        handleCloseModal={handleCloseModal}
        isSubmitting={isSubmitting}
      />
    </form>
  )
}
