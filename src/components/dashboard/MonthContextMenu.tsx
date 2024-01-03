import { Month } from '@/types/month';
import Options from '../svgs/Options';
import Modal from '../shared/Modal';
import { useModal } from '@/hooks/modalHooks';
import MonthDeleteForm from './MonthDeleteForm';
import MonthForm from './MonthForm';

type Props = {
  month: Month
}

export default function MonthContextMenu({ month }: Props) {
  const {
    openModal: openModalEdit,
    handleOpenModal: handleOpenModalEdit,
    handleCloseModal: handleCloseModalEdit
  } = useModal();

  const {
    openModal: openModalDelete,
    handleOpenModal: handleOpenModalDelete,
    handleCloseModal: handleCloseModalDelete
  } = useModal();

  return (
    <>
      <div className='dropdown dropdown-left dropdown-start'>
        <div tabIndex={0} role='button' className=''>
          <Options />
        </div>
        <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
          <li><button onClick={handleOpenModalEdit}>Edit</button></li>
          <li><button onClick={handleOpenModalDelete}>Delete</button></li>
        </ul>
      </div>

      <Modal openModal={openModalEdit} title='Edit month'>
        {openModalEdit && <MonthForm month={month} handleCloseModal={handleCloseModalEdit} />}
      </Modal>

      <Modal openModal={openModalDelete} title='Delete month'>
        {openModalDelete && <MonthDeleteForm month={month} handleCloseModal={handleCloseModalDelete} />}
      </Modal>
    </>
  );
}