import { AlertTriangle } from 'lucide-react';
import Modal from '../shared/Modal';

interface Props {
  open: boolean;
  categoryName: string;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function CategoryDeleteConfirmation({ open, categoryName, onClose, onConfirm, loading }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <Modal openModal={open} title='Delete Category'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex items-start gap-3 p-4 rounded-xl bg-error/10'>
          <AlertTriangle className='w-5 h-5 text-error shrink-0 mt-0.5' />
          <p className='text-sm text-base-content/80'>
            Are you sure you want to delete <strong>{categoryName}</strong>? This action cannot be undone.
          </p>
        </div>

        <div className='flex gap-2 justify-end'>
          <button className='btn' onClick={!loading ? onClose : undefined} type='button'>
            Cancel
          </button>
          <button className='btn btn-error' type={loading ? 'button' : 'submit'}>
            {loading && <span className='loading loading-spinner loading-sm' />}
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
}
