import cn from 'classnames';

import { useAddNewMonth } from '@/hooks/dashboardHooks';

import AddNewMonthForm from './AddMonthForm';
import Divider from '../shared/Divider';
import { AddButton } from '../shared/AddButton';

export default function AddMonth() {
  const {
    openModal, onClickOpen, onClickClose
  } = useAddNewMonth();

  return (
    <>
      <div className='ml-2'>
        <div className='tooltip tooltip-right' data-tip='Add new month'>
          <AddButton onClick={onClickOpen} />
        </div>
      </div>

      <dialog className={cn(
        'modal',
        {
          'modal-open': openModal
        })}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add new month</h3>
          <Divider className='-ml-6 -mr-6' />
          {openModal && (
            <AddNewMonthForm onClickClose={onClickClose} />
          )}
        </div>
      </dialog>
    </>
  )
}




