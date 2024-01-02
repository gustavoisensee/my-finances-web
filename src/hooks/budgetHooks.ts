import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { BudgetFormType } from '@/types/form';
import { openAlert } from '@/helpers/alert';
import { StateProps } from '@/components/shared/Toast';
import { createBudget } from '@/services/budget';
import { refreshMonthById } from '@/helpers/month';
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

type Props = {
  handleCloseModal: () => void;
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

export const useAddBudgetForm = ({ handleCloseModal }: Props) => {
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
