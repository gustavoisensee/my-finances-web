import { useModal } from '@/hooks/modalHooks';
import Modal from '../../../shared/Modal';
import Form from './MonthBudgetExpenseForm';
import EditButton from '@/components/shared/EditButton';

type Props = {
  id?: number;
  budgetId: number;
}

export default function MonthBudgetExpenseEditButton({ id, budgetId }: Props) {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <div className='tooltip tooltip-top flex items-center' data-tip='Edit expense'>
        <EditButton onClick={handleOpenModal} />
      </div>

      <Modal openModal={openModal} title='Edit expense'>
        {openModal && (
          <Form
            id={id}
            budgetId={budgetId}
            handleCloseModal={handleCloseModal}
          />
        )}
      </Modal>
    </>
  )
}




