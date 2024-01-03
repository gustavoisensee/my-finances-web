import Divider from '../../shared/Divider';
import { useBudgetDeleteConfirmation } from '@/hooks/budgetHooks';
import FormButtons from '../../shared/FormButtons';

type Props = {
  id: number;
  handleCloseModal: () => void;
}

export default function MonthBudgetDeleteConfirmation({ id, handleCloseModal }: Props) {
  const {
    handleSubmit, onSubmit, isSubmitting
  } = useBudgetDeleteConfirmation({ id, handleCloseModal });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <p>Are you sure you want to delete this Budget?</p>

      <Divider className='-ml-6 -mr-6' />

      <FormButtons
        handleCloseModal={handleCloseModal}
        isSubmitting={isSubmitting}
      />
    </form>
  )
}
