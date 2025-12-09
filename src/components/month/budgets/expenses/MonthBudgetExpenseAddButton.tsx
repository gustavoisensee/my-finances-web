import { useModal } from '@/hooks/modalHooks';
import { Plus } from 'lucide-react';
import Modal from '../../../shared/Modal';
import Form from './MonthBudgetExpenseForm';

type Props = {
  budgetId: number;
  budgetName: string;
}

export default function MonthBudgetExpenseAddButton({ budgetId, budgetName }: Props) {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <button
        type='button'
        onClick={handleOpenModal}
        className='inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors'
      >
        <Plus className='w-4 h-4' />
        Add Expense
      </button>

      <Modal openModal={openModal} title='Add expense'>
        {openModal && (
          <Form
            budgetId={budgetId}
            budgetName={budgetName}
            handleCloseModal={handleCloseModal}
          />
        )}
      </Modal>
    </>
  )
}
