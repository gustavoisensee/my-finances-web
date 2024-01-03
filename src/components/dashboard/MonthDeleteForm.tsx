import cn from 'classnames';

import { useCallback, useState } from 'react';
import { Month } from '@/types/month';
import Options from '../svgs/Options';
import Divider from '../shared/Divider';
import useMonthDeleteConfirmation from '@/hooks/dashboardHooks';
import Modal from '../shared/Modal';
import { useModal } from '@/hooks/modalHooks';

type Props = {
  month: Month;
  handleCloseModal: () => void;
}

export default function MonthDeleteForm({ month, handleCloseModal }: Props) {
  const {
    handleSubmit
  } = useMonthDeleteConfirmation({ month, handleCloseModal });

  return (
      <>
        <h3 className='font-bold text-lg'>Are you sure you want to delete this month?</h3>
        <p className='pt-2'>Deleting month means you are also deleting everything included in it, such as: budgets, incomes and expenses</p>
        
        <Divider className='-ml-6 -mr-6' />

        <div className='flex'>
          <button className='btn btn-primary mr-2' onClick={handleSubmit}>Yes</button>
          <button className='btn' onClick={handleCloseModal}>No</button>
        </div>
      </>
  );
}