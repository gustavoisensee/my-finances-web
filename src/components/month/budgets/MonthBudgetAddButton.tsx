import { useModal } from '@/hooks/modalHooks';
import Form from './MonthBudgetForm';
import { AddButton } from '../../shared/AddButton';
import Modal from '../../shared/Modal';

export default function MonthBudgetAddButton() {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <AddButton onClick={handleOpenModal} label="Add Budget" />

      <Modal openModal={openModal} title='Add budget'>
        {openModal && (
          <Form handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </>
  )
}
