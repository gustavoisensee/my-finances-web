import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IncomeFormType } from '@/types/form';
import { openAlert } from '@/helpers/alert';
import { StateProps } from '@/components/shared/Toast';
import { createIncome, updateIncome } from '@/services/income';
import { refreshMonthById } from '@/helpers/month';
import { useRouter } from 'next/router';
import { Income } from '@/types/month';

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

type Props = {
  income?: Income,
  handleCloseModal: () => void;
}

const createSuccessMsg: StateProps = {
  open: true,
  type: 'success',
  message: 'Income has been created successfully!'
};

const updateSuccessMsg: StateProps = {
  open: true,
  type: 'success',
  message: 'Income has been updated successfully!'
};

const errorMessage: StateProps = {
  open: true,
  type: 'error',
  message: 'Something went wrong, please try again!'
};

export const useIncomeForm = ({ income, handleCloseModal }: Props) => {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IncomeFormType>({
    defaultValues: {
      id: income?.id || 0,
      value: income?.value || 0,
      description: income?.description || '',
      createdAt: income?.createdAt || new Date().toISOString(),
      monthId: (route.query?.id || 0) as number
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IncomeFormType> = async (data) => {
    try {
      const action = data?.id ? updateIncome : createIncome;
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
