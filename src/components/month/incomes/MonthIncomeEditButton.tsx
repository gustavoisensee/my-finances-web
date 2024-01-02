import Form from './MonthIncomeForm';
import { useModal } from '@/hooks/modalHooks';
import Modal from '../../shared/Modal';
import EditButton from '@/components/shared/EditButton';

type Props = {
  id?: number;
}

export default function MonthIncomeEditButton({ id }: Props) {
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
          <Form id={id} handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </>
  )
}




