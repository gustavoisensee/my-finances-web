import React, { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import TextInput from '../form/TextInput';
import FormButtons from '../shared/FormButtons';
import { Category } from '@/types/category';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string }) => void;
  initialData?: Category | null;
  loading?: boolean;
}

export default function CategoryModal({ open, onClose, onSubmit, initialData, loading }: Props) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    } else {
      setName('');
    }
    setError('');
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    onSubmit({ name: name.trim() });
  };

  return (
    <Modal openModal={open} title={initialData ? 'Edit Category' : 'New Category'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          title="Category Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          error={error}
          disabled={loading}
        />
        <FormButtons
          isSubmitting={loading ?? false}
          handleCloseModal={onClose}
        />
      </form>
    </Modal>
  );
}
