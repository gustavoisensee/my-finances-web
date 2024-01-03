import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ExpenseFormType } from '@/types/form';
import { openAlert } from '@/helpers/alert';
import { StateProps } from '@/components/shared/Toast';
import { createExpense, deleteExpense, updateExpense } from '@/services/expense';
import { refreshMonthById } from '@/helpers/month';
import { Expense } from '@/types/month';

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
  expense?: Expense,
  budgetId: number;
  handleCloseModal: () => void;
}

const createSuccessMsg: StateProps = {
  open: true,
  type: 'success',
  message: 'Expense has been created successfully!'
};

const updateSuccessMsg: StateProps = {
  open: true,
  type: 'success',
  message: 'Expense has been updated successfully!'
};

const deleteSuccessMsg: StateProps = {
  open: true,
  type: 'success',
  message: 'Expense has been deleted successfully!'
};

const errorMessage: StateProps = {
  open: true,
  type: 'error',
  message: 'Something went wrong, please try again!'
};

export const useExpenseForm = ({ expense, budgetId, handleCloseModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormType>({
    defaultValues: {
      id: expense?.id,
      value: expense?.value || 0,
      description: expense?.description || '',
      createdAt: expense?.createdAt || new Date().toISOString(),
      budgetId,
      categoryId: expense?.categoryId || 0
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<ExpenseFormType> = async (data) => {
    try {
      const action = data?.id ? updateExpense : createExpense;
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

export const useExpenseDeleteConfirmation = ({ id, handleCloseModal }: DeleteProps) => {
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = async () => {
    try {
      const r = await deleteExpense(id);

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
