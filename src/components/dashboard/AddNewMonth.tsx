import cn from 'classnames';

import Plus from '../svgs/Plus';
import { useAddNewMonth } from '@/hooks/dashboardHooks';

import AddNewMonthForm from './AddNewMonthForm';
import Divider from '../shared/Divider';

export default function AddNewMonth() {
  const {
    openModal, onClickOpen, onClickClose
  } = useAddNewMonth();

  return (
    <>
      <div className='tooltip tooltip-right' data-tip='Add new month'>
        <button
          className='btn btn-primary btn-circle btn-sm ml-2'
          onClick={onClickOpen}
        >
          <Plus />
        </button>
      </div>

      <dialog className={cn({
        'modal': true,
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




