import Form from './MonthIncomeForm';
import { useModal } from '@/hooks/modalHooks';
import Modal from '../../shared/Modal';
import EditButton from '@/components/shared/EditButton';
import { Income } from '@/types/month';

type Props = {
  income: Income
}

export default function MonthIncomeEditButton({ income }: Props) {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <div className='tooltip tooltip-top' data-tip='Edit income'>
        <EditButton onClick={handleOpenModal} />
      </div>

      <Modal openModal={openModal} title='Edit income'>
        {openModal && (
          <Form income={income} handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </>
  )
}




