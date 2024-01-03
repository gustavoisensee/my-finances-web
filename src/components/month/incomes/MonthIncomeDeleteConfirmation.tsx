import Divider from '../../shared/Divider';
import { useIncomeDeleteConfirmation } from '@/hooks/incomeHooks';
import FormButtons from '../../shared/FormButtons';

type Props = {
  id: number,
  handleCloseModal: () => void;
}

export default function MonthIncomeDeleteConfirmation({ id, handleCloseModal }: Props) {
  const {
    handleSubmit, onSubmit, isSubmitting
  } = useIncomeDeleteConfirmation({ id, handleCloseModal });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <p>Are you sure you want to delete this income?</p>

      <Divider className='-ml-6 -mr-6' />

      <FormButtons
        handleCloseModal={handleCloseModal}
        isSubmitting={isSubmitting}
      />
    </form>
  )
}
