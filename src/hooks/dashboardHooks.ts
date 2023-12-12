import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export type Inputs = {
  firstName: string;
  lastName: string;
}

export const useAddNewMonth = () => {
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors
  } = useForm<Inputs>({
    reValidateMode: 'onSubmit'
  });

  const onClickOpen = useCallback(() => {
    setOpenModal(true);
  }, []);

  const onClickClose = useCallback(() => {
    clearErrors(['firstName', 'lastName']);
    reset({
      firstName: '',
      lastName: ''
    });
    setOpenModal(false);
  }, [reset, clearErrors]);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return {
    openModal,
    onClickOpen,
    onClickClose,
    register,
    handleSubmit,
    onSubmit,
    errors
  }
};
