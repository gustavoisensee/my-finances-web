import cn from 'classnames';

import { useCallback, useState } from 'react';
import { Month } from '@/types/month';
import Options from '../svgs/Options';
import Divider from '../shared/Divider';
import useMonthDeleteConfirmation from '@/hooks/dashboardHooks';

type Props = {
  month: Month
}

export default function MonthDeleteConfirmation({ month }: Props) {
  const {
    openModal, handleOpenModal,
    handleYesClick, handleNoClick
  } = useMonthDeleteConfirmation({ month });

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

      <dialog className={cn(
        'modal',
        {
          'modal-open': openModal
        })}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Are you sure you want to delete this month?</h3>
          <p className='pt-2'>Deleting month means you are also deleting everything included in it, such as: budgets, incomes and expenses</p>
          <Divider className='-ml-6 -mr-6' />

          <div className='flex'>
            <button className='btn btn-primary mr-2' onClick={handleYesClick}>Yes</button>
            <button className='btn' onClick={handleNoClick}>No</button>
          </div>
        </div>
      </dialog>
    </>
  );
}