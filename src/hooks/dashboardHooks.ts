import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputTypes } from '@/types/form';
import { createMonth } from '@/services/month';
import { Month } from '@/types/month';

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

export const useAddNewMonthForm = ({ onClickClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
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
      const d = await createMonth(data);
      if (d) {
        onClickClose();
        alert('all created!');
        // TODO update Months overview
      } else {
        alert('Something went wrong!');  
      }
      
    } catch {
      alert('Something went wrong!');
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors
  }
};
