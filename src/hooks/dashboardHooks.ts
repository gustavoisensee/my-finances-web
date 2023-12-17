import * as yup from 'yup';
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputTypes } from '@/types/form';
import { createMonth } from '@/services/month';
import { obsDashboard } from '@/helpers/month';
import { obsAlert } from '@/helpers/alert';
import { StateProps } from '@/components/shared/Toast';

const monthRequired = 'Month is required!';
const yearRequired = 'Year is required!';

const schema = yup.object({
  value: yup.number().min(1, monthRequired).required(monthRequired),
  description: yup.string().optional(),
  createdAt: yup.string().required('Create date is required!'),
  yearId: yup.number().min(1, yearRequired).required(yearRequired)
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
  } = useForm<InputTypes>({
    defaultValues: {
      value: 0,
      description: '',
      createdAt: new Date().toISOString(),
      yearId: 0
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<InputTypes> = async (data) => {
    try {
      const r = await createMonth(data);
      if (r?.data) {
        onClickClose();
        obsAlert.notify<StateProps>(successMessage);
        obsDashboard.notify();
        push(`/month/${r?.data?.id}`);
      } else {
        obsAlert.notify<StateProps>(errorMessage);
      }
    } catch (e) {
      obsAlert.notify<StateProps>(errorMessage);
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
