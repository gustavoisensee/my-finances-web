import Form from './MonthForm';
import { AddButton } from '../shared/AddButton';
import Modal from '../shared/Modal';
import { useModal } from '@/hooks/modalHooks';

export default function AddMonth() {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <div className='ml-4'>
        <AddButton onClick={handleOpenModal} label="New Month" />
      </div>

      <Modal openModal={openModal} title='Add new month'>
        {openModal && (
          <Form handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </>
  )
}
