import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { BudgetFormType } from '@/types/form';
import { openAlert } from '@/helpers/alert';
import { StateProps } from '@/components/shared/Toast';
import { createBudget, deleteBudget, updateBudget } from '@/services/budget';
import { refreshMonthById } from '@/helpers/month';
import { useRouter } from 'next/router';
import { Budget } from '@/types/month';

const monthRequired = 'Month is required!';
const valueRequired = 'Cost is required!';
const descriptionRequired = 'Description is required!';

const schema = yup.object({
  value: yup.number().typeError(valueRequired).required(valueRequired),
  description: yup.string().required(descriptionRequired),
  createdAt: yup.string().required('Create date is required!'),
  monthId: yup.number().min(1, monthRequired).required(monthRequired)
});

type Props = {
  budget?: Budget,
  handleCloseModal: () => void;
}

const createSuccessMsg: StateProps = {
  open: true,
  type: 'success',
  message: 'Budget has been created successfully!'
};

const updateSuccessMsg: StateProps = {
  open: true,
  type: 'success',
  message: 'Budget has been updated successfully!'
};

const deleteSuccessMsg: StateProps = {
  open: true,
  type: 'success',
  message: 'Budget has been deleted successfully!'
};

const errorMessage: StateProps = {
  open: true,
  type: 'error',
  message: 'Something went wrong, please try again!'
};

export const useBudgetForm = ({ budget, handleCloseModal }: Props) => {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BudgetFormType>({
    defaultValues: {
      id: budget?.id || 0,
      value: budget?.value || 0,
      description: budget?.description || '',
      createdAt: budget?.createdAt || new Date().toISOString(),
      monthId: (route.query?.id || 0) as number
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<BudgetFormType> = async (data) => {
    try {
      const action = data?.id ? updateBudget : createBudget;
      const r = await action(data);

      if (r?.data) {
        handleCloseModal();
        openAlert(data?.id ? updateSuccessMsg : createSuccessMsg);
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

type DeleteProps = {
  id: number;
  handleCloseModal: () => void; 
}

export const useBudgetDeleteConfirmation = ({ id, handleCloseModal }: DeleteProps) => {
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = async () => {
    try {
      const r = await deleteBudget(id);

      if (r?.data) {
        handleCloseModal();
        openAlert(deleteSuccessMsg);
        refreshMonthById();
      } else {
        openAlert(errorMessage);
      }
    } catch (e) {
      openAlert(errorMessage);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    isSubmitting
  }
};
