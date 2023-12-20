import * as yup from 'yup';
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IncomeFormType } from '@/types/form';
import { openAlert } from '@/helpers/alert';
import { StateProps } from '@/components/shared/Toast';
import { createIncome } from '@/services/income';
import { refreshMonthById } from '@/helpers/month';
import { useRouter } from 'next/router';

const monthRequired = 'Month is required!';
const valueRequired = 'Cost is required!';
const descriptionRequired = 'Description is required!';
const createdAtRequired = 'Create date is required!';

const schema = yup.object({
  value: yup.number().typeError(valueRequired).required(valueRequired),
  description: yup.string().required(descriptionRequired),
  createdAt: yup.string().required(createdAtRequired),
  monthId: yup.number().min(1, monthRequired).required(monthRequired)
});

export const useAddIncome = () => {
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
  message: 'Income has been created successfully!'
};

const errorMessage: StateProps = {
  open: true,
  type: 'error',
  message: 'Something went wrong, please try again!'
};

export const useAddIncomeForm = ({ onClickClose }: Props) => {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IncomeFormType>({
    defaultValues: {
      value: 0,
      description: '',
      createdAt: new Date().toISOString(),
      monthId: (route.query?.id || 0) as number
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IncomeFormType> = async (data) => {
    try {
      const r = await createIncome(data);
      if (r?.data) {
        onClickClose();
        openAlert(successMessage);
        refreshMonthById();
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
