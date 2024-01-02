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
      <div className='tooltip tooltip-right flex items-center' data-tip='Add budget'>
        <AddButton onClick={handleOpenModal} className='btn-xs' />
      </div>

      <Modal openModal={openModal} title='Add budget'>
        {openModal && (
          <Form handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </>
  )
}




