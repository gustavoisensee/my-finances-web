import Form from './MonthIncomeDeleteConfirmation';
import { useModal } from '@/hooks/modalHooks';
import Modal from '../../shared/Modal';
import DeleteButton from '@/components/shared/DeleteButton';

type Props = {
  id: number
}

export default function MonthIncomeDeleteButton({ id }: Props) {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <div className='tooltip tooltip-top' data-tip='Delete income'>
        <DeleteButton onClick={handleOpenModal} />
      </div>

      <Modal openModal={openModal} title='Edit income'>
        {openModal && (
          <Form id={id} handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </>
  )
}




