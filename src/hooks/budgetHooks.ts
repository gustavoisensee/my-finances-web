import * as yup from 'yup';
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { BudgetFormType } from '@/types/form';
import { obsAlert } from '@/helpers/alert';
import { StateProps } from '@/components/shared/Toast';
import { createBudget } from '@/services/budget';
import { obsMonthById } from '@/helpers/month';
import { useRouter } from 'next/router';

const monthRequired = 'Month is required!';
const valueRequired = 'Cost is required!';
const descriptionRequired = 'Description is required!';

const schema = yup.object({
  value: yup.number().typeError(valueRequired).required(valueRequired),
  description: yup.string().required(descriptionRequired),
  createdAt: yup.string().required('Create date is required!'),
  monthId: yup.number().min(1, monthRequired).required(monthRequired)
});

export const useAddBudget = () => {
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
  message: 'Budget has been created successfully!'
};

const errorMessage: StateProps = {
  open: true,
  type: 'error',
  message: 'Something went wrong, please try again!'
};

export const useAddBudgetForm = ({ onClickClose }: Props) => {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BudgetFormType>({
    defaultValues: {
      value: 0,
      description: '',
      createdAt: new Date().toISOString(),
      monthId: (route.query?.id || 0) as number
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<BudgetFormType> = async (data) => {
    try {
      const r = await createBudget(data);
      if (r?.data) {
        onClickClose();
        obsAlert.notify<StateProps>(successMessage);
        obsMonthById.notify();
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
