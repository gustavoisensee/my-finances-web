import cn from 'classnames';

import { useAddIncome } from '@/hooks/incomeHooks';

import AddIncomeForm from './AddIncomeForm';
import Divider from '../shared/Divider';
import { AddButton } from '../shared/AddButton';

export default function AddIncome() {
  const {
    openModal, onClickOpen, onClickClose
  } = useAddIncome();

  return (
    <>
      <div className='tooltip tooltip-right' data-tip='Add income'>
        <AddButton onClick={onClickOpen} className='btn-xs' />
      </div>

      <dialog className={cn(
        'modal',
        {
          'modal-open': openModal
        })}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add new income</h3>
          <Divider className='-ml-6 -mr-6' />
          {openModal && (
            <AddIncomeForm onClickClose={onClickClose} />
          )}
        </div>
      </dialog>
    </>
  )
}




