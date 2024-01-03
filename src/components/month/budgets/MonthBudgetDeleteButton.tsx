import Form from './MonthBudgetDeleteConfirmation';
import Modal from '../../shared/Modal';
import { useModal } from '@/hooks/modalHooks';
import DeleteButton from '@/components/shared/DeleteButton';

type Props = {
  id: number;
}

export default function MonthBudgetDeleteButton({ id }: Props) {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <div className='tooltip tooltip-left flex items-center z-10' data-tip='Delete budget'>
        <DeleteButton onClick={handleOpenModal} />
      </div>

      <Modal openModal={openModal} title='Delete budget'>
        {openModal && (
          <Form id={id} handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </>
  )
}




