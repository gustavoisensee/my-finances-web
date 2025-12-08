import * as yup from 'yup';
import { useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { MonthFormType, MonthCopyFormType } from '@/types/form';
import { createMonth, updateMonth, copyMonth } from '@/services/month';
import { refreshDashboard } from '@/helpers/month';
import { openAlert } from '@/helpers/alert';
import { StateProps } from '@/components/shared/Toast';
import { useYears } from '@/hooks/yearHooks';

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
  const navigate = useNavigate();
  const { year } = useYears();

  // Get current month (1-12)
  const currentMonth = new Date().getMonth() + 1;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MonthFormType>({
    defaultValues: {
      id: month?.id || 0,
      value: month?.value || currentMonth,
      description: month?.description || '',
      createdAt: month?.createdAt || new Date().toISOString(),
      yearId: month?.yearId || 0
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  // Set yearId when year data becomes available (only for new months)
  useEffect(() => {
    if (!month && year?.id) {
      setValue('yearId', year.id);
    }
  }, [month, year?.id, setValue]);

  const onSubmit: SubmitHandler<MonthFormType> = async (data) => {
    try {
      const action = data?.id ? updateMonth : createMonth;
      const r = await action(data);

      if (r) {
        handleCloseModal();
        openAlert(data?.id ? updateSuccessMsg : createSuccessMsg);
        refreshDashboard();
        if (!data?.id) {
          navigate(`/month/${r?.id}`);
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


import { Month } from '@/types/month';
import { deleteMonth } from '@/services/month';

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
      if (r) {
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

// Copy Month Hook

const copyMonthRequired = 'Month is required!';
const copyYearRequired = 'Year is required!';

const copySchema = yup.object({
  value: yup.number().typeError(copyMonthRequired).min(1, copyMonthRequired).required(copyMonthRequired),
  yearId: yup.number().typeError(copyYearRequired).min(1, copyYearRequired).required(copyYearRequired)
});

type UseMonthCopyForm = {
  month: Month;
  handleCloseModal: () => void;
};

const copySuccessMsg: StateProps = {
  open: true,
  type: 'success',
  message: 'Month has been copied successfully!'
};

const copyErrorMsg: StateProps = {
  open: true,
  type: 'error',
  message: 'Something went wrong, please try again!'
};

export const useMonthCopyForm = ({ month, handleCloseModal }: UseMonthCopyForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MonthCopyFormType>({
    defaultValues: {
      value: month.value,
      yearId: month.yearId
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(copySchema)
  });

  const onSubmit: SubmitHandler<MonthCopyFormType> = async (data) => {
    try {
      const r = await copyMonth(month.id, { value: data.value, yearId: data.yearId });

      if (r) {
        handleCloseModal();
        openAlert(copySuccessMsg);
        refreshDashboard();
      } else {
        openAlert(copyErrorMsg);
      }
    } catch (e) {
      openAlert(copyErrorMsg);
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
