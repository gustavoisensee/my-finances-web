import Form from './MonthIncomeForm';
import { AddButton } from '../../shared/AddButton';
import { useModal } from '@/hooks/modalHooks';
import Modal from '../../shared/Modal';

export default function MonthIncomeAddButton() {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <AddButton onClick={handleOpenModal} label="Add Income" />

      <Modal openModal={openModal} title='Add new income'>
        {openModal && (
          <Form handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </>
  )
}
