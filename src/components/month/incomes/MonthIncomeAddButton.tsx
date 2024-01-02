import MonthIncomeForm from './MonthIncomeForm';
import { AddButton } from '../../shared/AddButton';
import { useModal } from '@/hooks/modalHooks';
import Modal from '../../shared/Modal';

export default function MonthIncomeAddButton() {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <div className='tooltip tooltip-right' data-tip='Add income'>
        <AddButton onClick={handleOpenModal} className='btn-xs' />
      </div>

      <Modal openModal={openModal} title='Add new income'>
        {openModal && (
          <MonthIncomeForm handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </>
  )
}




