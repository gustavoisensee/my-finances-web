import { useModal } from '@/hooks/modalHooks';
import Modal from '../../../shared/Modal';
import Plus from '../../../svgs/Plus';
import Form from './MonthBudgetExpenseForm';

type Props = {
  budgetId: number;
}

export default function MonthBudgetExpenseAddButton({ budgetId }: Props) {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <div className='tooltip tooltip-right' data-tip='Add expense'>
        <button
          type='button'
          onClick={handleOpenModal}
          className='btn btn-primary min-h-0 h-auto py-1 px-2'
        >
          <Plus />
          New expense
        </button>
      </div>

      <Modal openModal={openModal} title='Add expense'>
        {openModal && (
          <Form
            budgetId={budgetId}
            handleCloseModal={handleCloseModal}
          />
        )}
      </Modal>
    </>
  )
}




