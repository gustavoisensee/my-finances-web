import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import { ExpenseFormType } from '@/types/form';
import { openAlert } from '@/helpers/alert';
import { StateProps } from '@/components/shared/Toast';
import { createExpense } from '@/services/expense';
import { refreshMonthById } from '@/helpers/month';

const valueRequired = 'Cost is required!';
const descriptionRequired = 'Description is required!';
const createdAtRequired = 'Create date is required!';
const budgetIdRequired = 'Budget is required!';

const schema = yup.object({
  value: yup.number().typeError(valueRequired).required(valueRequired),
  description: yup.string().required(descriptionRequired),
  createdAt: yup.string().required(createdAtRequired),
  budgetId: yup.number().min(1, budgetIdRequired).required(budgetIdRequired)
});

type Props = {
  budgetId: number;
  handleCloseModal: () => void;
}

const successMessage: StateProps = {
  open: true,
  type: 'success',
  message: 'Expense has been created successfully!'
};

const errorMessage: StateProps = {
  open: true,
  type: 'error',
  message: 'Something went wrong, please try again!'
};

export const useExpenseForm = ({ budgetId, handleCloseModal }: Props) => {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormType>({
    defaultValues: {
      value: 0,
      description: '',
      createdAt: new Date().toISOString(),
      budgetId,
      categoryId: 0
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<ExpenseFormType> = async (data) => {
    try {
      const r = await createExpense(data);
      if (r?.data) {
        handleCloseModal();
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
