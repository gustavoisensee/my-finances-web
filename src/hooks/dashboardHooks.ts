import * as yup from 'yup';
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import { MonthFormType } from '@/types/form';
import { createMonth } from '@/services/month';
import { obsDashboard, refreshDashboard } from '@/helpers/month';
import { obsAlert, openAlert } from '@/helpers/alert';
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

export const useAddNewMonth = () => {
  const [openModal, setOpenModal] = useState(false);

  const onClickOpen = useCallback(() => setOpenModal(true), []);
  const onClickClose = useCallback(() => setOpenModal(false), []);

  return {
    openModal,
    onClickOpen,
    onClickClose,
  }
};

type Props = {
  onClickClose: () => void;
}

const successMessage: StateProps = {
  open: true,
  type: 'success',
  message: 'Month has been created successfully!'
};

const errorMessage: StateProps = {
  open: true,
  type: 'error',
  message: 'Something went wrong, please try again!'
};

export const useAddNewMonthForm = ({ onClickClose }: Props) => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MonthFormType>({
    defaultValues: {
      value: 0,
      description: '',
      createdAt: new Date().toISOString(),
      yearId: 0
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<MonthFormType> = async (data) => {
    try {
      const r = await createMonth(data);
      if (r?.data) {
        onClickClose();
        openAlert(successMessage);
        refreshDashboard();
        push(`/month/${r?.data?.id}`);
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
  month: Month
};

export default function useMonthDeleteConfirmation({ month }: UseMonthDeleteConfirmation) {
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
        openAlert(successDeleteMonth);
        refreshDashboard();
      } else {
        openAlert(errorDeleteMonth);
      }
    } catch (e) {
      openAlert(errorDeleteMonth);
    }
  }, [month, handleNoClick]);

  return {
    openModal,
    handleYesClick, handleNoClick, handleOpenModal
  }
}
