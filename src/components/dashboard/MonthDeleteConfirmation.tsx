import cn from 'classnames';

import { useCallback, useState } from 'react';
import { Month } from '@/types/month';
import { deleteMonth } from '@/services/month';
import { obsAlert } from '@/helpers/alert';

import Options from '../svgs/Options';
import Divider from '../shared/Divider';
import { StateProps } from '../shared/Toast';
import { obsDashboard } from '@/helpers/month';

type Props = {
  month: Month
}

const successMessage: StateProps = {
  open: true,
  type: 'success',
  message: 'Month has been deleted successfully!'
};

const errorMessage: StateProps = {
  open: true,
  type: 'error',
  message: 'Something went wrong, please try again!'
};

export default function MonthDeleteConfirmation({ month }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleNoClick = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleYesClick = useCallback(async() => {
    try {
      const r = await deleteMonth(month.id)
      if (r?.data) {
        handleNoClick();
        obsAlert.notify<StateProps>(successMessage);
        obsDashboard.notify();
      } else {
        obsAlert.notify<StateProps>(errorMessage);
      }
    } catch (e) {
      obsAlert.notify<StateProps>(errorMessage);
    }
  }, [month, handleNoClick]);

  return (
    <>
      <div className='dropdown dropdown-left dropdown-start'>
        <div tabIndex={0} role='button' className=''>
          <Options />
        </div>
        <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
          <li><button onClick={handleOpenModal}>Delete</button></li>
        </ul>
      </div>

      <dialog className={cn({
        'modal': true,
        'modal-open': openModal
      })}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Are you sure you want to delete this month?</h3>
          <p className=''>Deleting month means you are also deleting everything included in it, such as: budgets, incomes and expenses</p>
          <Divider className='-ml-6 -mr-6' />
          
          <div className='flex'>
            <button className='btn btn-primary mr-2' onClick={handleYesClick}>Yes</button>
            <button className='btn btn-neutral' onClick={handleNoClick}>No</button>
          </div>
        </div>
      </dialog>
    </>
  );
}