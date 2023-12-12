import cn from 'classnames';

import Plus from '../svgs/Plus';
import { useAddNewMonth } from '@/hooks/dashboardHooks';
import TextInput from '../form/TextInput';

export default function AddNewMonth() {
  const {
    openModal, onClickOpen, onClickClose,
    register, handleSubmit, onSubmit, errors
  } = useAddNewMonth();

  return (
    <>
      <div className='tooltip tooltip-right' data-tip='Add new month'>
        <button className='btn btn-primary btn-circle btn-sm ml-2' onClick={onClickOpen}>
          <Plus />
        </button>
      </div>

      <dialog className={cn({
        'modal': true,
        'modal-open': openModal
      })}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add new month</h3>
          {openModal && (
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>

              <TextInput title='First name' keyName='firstName' register={register} errors={errors} required />
              <TextInput title='Last name' keyName='lastName' register={register} errors={errors} required />

              <div className='flex'>
                <button className='btn btn-primary' type='submit'>Submit</button>
                <button className='btn ml-2' onClick={onClickClose}>Close</button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  )
}




