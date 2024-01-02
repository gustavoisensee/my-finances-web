import EditButton from '../../shared/EditButton';

import MonthBudgetForm from './MonthBudgetForm';
import Modal from '../../shared/Modal';
import { useModal } from '@/hooks/modalHooks';

type Props = {
  id: number;
}

export default function MonthBudgetEditButton({ id }: Props) {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <div className='tooltip tooltip-top flex items-center z-10' data-tip='Edit budget'>
        <EditButton onClick={handleOpenModal} />
      </div>

      <Modal openModal={openModal} title='Edit budget'>
        {openModal && (
          <MonthBudgetForm handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </>
  )
}




