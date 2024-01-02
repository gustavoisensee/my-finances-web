import cn from 'classnames';

import AddNewMonthForm from './AddMonthForm';
import Divider from '../shared/Divider';
import { AddButton } from '../shared/AddButton';
import Modal from '../shared/Modal';
import { useModal } from '@/hooks/modalHooks';

export default function AddMonth() {
  const {
    openModal, handleOpenModal, handleCloseModal
  } = useModal();

  return (
    <>
      <div className='ml-2'>
        <div className='tooltip tooltip-right' data-tip='Add new month'>
          <AddButton onClick={handleOpenModal} />
        </div>
      </div>

      <Modal openModal={openModal} title='Add new month'>
        {openModal && (
          <AddNewMonthForm handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </>
  )
}




