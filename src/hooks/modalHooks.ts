import { useCallback, useState } from 'react';

export const useModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => setOpenModal(true), []);
  const handleCloseModal = useCallback(() => setOpenModal(false), []);

  return {
    openModal,
    handleOpenModal,
    handleCloseModal,
  }
};
