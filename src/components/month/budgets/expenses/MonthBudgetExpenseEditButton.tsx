import { useModal } from '@/hooks/modalHooks';
import Modal from '../../../shared/Modal';
import Form from './MonthBudgetExpenseForm';
import EditButton from '@/components/shared/EditButton';
import { Expense } from '@/types/month';

type Props = {
  expense?: Expense;
  budgetId: number;
}

export default function MonthBudgetExpenseEditButton({ expense, budgetId }: Props) {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <div className='tooltip tooltip-top flex items-center z-10' data-tip='Edit expense'>
        <EditButton onClick={handleOpenModal} />
      </div>

      <Modal openModal={openModal} title='Edit expense'>
        {openModal && (
          <Form
            expense={expense}
            budgetId={budgetId}
            handleCloseModal={handleCloseModal}
          />
        )}
      </Modal>
    </>
  )
}




