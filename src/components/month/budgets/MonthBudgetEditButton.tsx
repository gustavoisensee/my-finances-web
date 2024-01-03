import EditButton from '../../shared/EditButton';

import Form from './MonthBudgetForm';
import Modal from '../../shared/Modal';
import { useModal } from '@/hooks/modalHooks';
import { Budget } from '@/types/month';

type Props = {
  budget: Budget
}

export default function MonthBudgetEditButton({ budget }: Props) {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <div className='tooltip tooltip-left flex items-center z-10' data-tip='Edit budget'>
        <EditButton onClick={handleOpenModal} />
      </div>

      <Modal openModal={openModal} title='Edit budget'>
        {openModal && (
          <Form budget={budget} handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </>
  )
}




