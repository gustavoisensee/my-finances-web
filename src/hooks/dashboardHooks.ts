import * as yup from 'yup';
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import { MonthFormType } from '@/types/form';
import { createMonth, updateMonth } from '@/services/month';
import { refreshDashboard } from '@/helpers/month';
import { openAlert } from '@/helpers/alert';
import { StateProps } from '@/components/shared/Toast';

const monthRequired = 'Month is required!';
const yearRequired = 'Year is required!';
const createdAtRequired = 'Create date is required!';

const schema = yup.object({
  value: yup.number().typeError(monthRequired).min(1, monthRequired).required(monthRequired),
  description: yup.string().optional(),
  createdAt: yup.string().required(createdAtRequired),
  yearId: yup.number().typeError(yearRequired).min(1, yearRequired).required(yearRequired)
});

type Props = {
  month?: Month;
  handleCloseModal: () => void;
}

const createSuccessMsg: StateProps = {
  open: true,
  type: 'success',
  message: 'Month has been created successfully!'
};

const updateSuccessMsg: StateProps = {
  open: true,
  type: 'success',
  message: 'Month has been updated successfully!'
};

const errorMessage: StateProps = {
  open: true,
  type: 'error',
  message: 'Something went wrong, please try again!'
};

export const useMonthForm = ({ month, handleCloseModal }: Props) => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MonthFormType>({
    defaultValues: {
      id: month?.id || 0,
      value: month?.value || 0,
      description: month?.description || '',
      createdAt: month?.createdAt || new Date().toISOString(),
      yearId: month?.yearId || 0
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<MonthFormType> = async (data) => {
    try {
      const action = data?.id ? updateMonth : createMonth;
      const r = await action(data);

      if (r?.data) {
        handleCloseModal();
        openAlert(data?.id ? updateSuccessMsg : createSuccessMsg);
        refreshDashboard();
        if (!data?.id) {
          push(`/month/${r?.data?.id}`);
        }
      } else {
        openAlert(errorMessage);
      }
    } catch (e) {
      openAlert(errorMessage);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting
  }
};

// @@@@@@@@@@@@@@@@@@@@@@

// import { useCallback, useState } from 'react';
import { Month } from '@/types/month';
import { deleteMonth } from '@/services/month';
// import { obsAlert } from '@/helpers/alert';

// import { StateProps } from '../shared/Toast';
// import { obsDashboard } from '@/helpers/month';



const successDeleteMonth: StateProps = {
  open: true,
  type: 'success',
  message: 'Month has been deleted successfully!'
};

const errorDeleteMonth: StateProps = {
  open: true,
  type: 'error',
  message: 'Something went wrong, please try again!'
};

type UseMonthDeleteConfirmation = {
  month: Month;
  handleCloseModal: () => void;
};

export default function useMonthDeleteConfirmation({ month, handleCloseModal }: UseMonthDeleteConfirmation) {
  const handleSubmit = useCallback(async() => {
    try {
      const r = await deleteMonth(month.id)
      if (r?.data) {
        handleCloseModal();
        openAlert(successDeleteMonth);
        refreshDashboard();
      } else {
        openAlert(errorDeleteMonth);
      }
    } catch (e) {
      openAlert(errorDeleteMonth);
    }
  }, [month, handleCloseModal]);

  return {
    handleSubmit
  }
}
