import cn from 'classnames';

import Plus from '../svgs/Plus';
import { useAddBudget } from '@/hooks/budgetHooks';

import AddBudgetForm from './AddBudgetForm';
import Divider from '../shared/Divider';
import { AddButton } from '../shared/AddButton';

export default function AddBudget() {
  const {
    openModal, onClickOpen, onClickClose
  } = useAddBudget();

  return (
    <>
      <div className='tooltip tooltip-right' data-tip='Add new month'>
        <AddButton onClick={onClickOpen} className='btn-xs' />
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
            <AddBudgetForm onClickClose={onClickClose} />
          )}
        </div>
      </dialog>
    </>
  )
}




