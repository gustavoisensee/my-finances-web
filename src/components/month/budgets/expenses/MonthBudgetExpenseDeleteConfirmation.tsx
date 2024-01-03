import Divider from '../../../shared/Divider';
import { useExpenseDeleteConfirmation } from '@/hooks/expenseHooks';
import FormButtons from '../../../shared/FormButtons';

type Props = {
  id: number;
  handleCloseModal: () => void;
}

export default function MonthBudgetExpenseDeleteConfirmation({ id, handleCloseModal }: Props) {
  const {
    handleSubmit, onSubmit, isSubmitting
  } = useExpenseDeleteConfirmation({ id, handleCloseModal });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <p>Are you sure you want to delete this Expense?</p>

      <Divider className='-ml-6 -mr-6' />

      <FormButtons
        handleCloseModal={handleCloseModal}
        isSubmitting={isSubmitting}
      />
    </form>
  )
}
