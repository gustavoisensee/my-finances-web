import { useModal } from '@/hooks/modalHooks';
import Modal from '../../../shared/Modal';
import Form from './MonthBudgetExpenseDeleteConfirmation';
import DeleteButton from '@/components/shared/DeleteButton';

type Props = {
  id: number;
}

export default function MonthBudgetExpenseDeleteButton({ id }: Props) {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <div className='tooltip tooltip-top flex items-center z-10' data-tip='Delete expense'>
        <DeleteButton onClick={handleOpenModal} />
      </div>

      <Modal openModal={openModal} title='Delete expense'>
        {openModal && (
          <Form
            id={id}
            handleCloseModal={handleCloseModal}
          />
        )}
      </Modal>
    </>
  )
}
