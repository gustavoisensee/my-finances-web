import { Category } from '@/types/category';
import { Tag, Shield, User } from 'lucide-react';
import cn from 'classnames';
import { useState } from 'react';
import EditButton from '../shared/EditButton';
import DeleteButton from '../shared/DeleteButton';
import CategoryModal from './CategoryModal';
import CategoryDeleteConfirmation from './CategoryDeleteConfirmation';
import { useUpdateCategory, useDeleteCategory } from '@/hooks/categoryHooks';

const isSystemCategory = (userId: number | null) => userId === null;

type Props = {
  data: Category[];
}

const AdminBadge = () => (
  <span className='inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-xs font-medium bg-base-200 text-base-content/70'>
    <Shield className='w-3 h-3' />
    System
  </span>
);

const YouBadge = () => (
  <span className='inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-xs font-medium bg-primary/10 text-primary'>
    <User className='w-3 h-3' />
    You
  </span>
);

const getCategoryColor = (name: string) => {
  const colors = [
    'bg-error/20 text-error',
    'bg-info/20 text-info',
    'bg-secondary/20 text-secondary',
    'bg-warning/20 text-warning',
    'bg-success/20 text-success',
    'bg-primary/20 text-primary',
    'bg-accent/20 text-accent',
    'bg-info/20 text-info',
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

const CategoryTable = ({ data }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const handleEdit = (cat: Category) => {
    setEditCategory(cat);
    setModalOpen(true);
  };

  const handleDelete = (cat: Category) => {
    setDeleteCategory(cat);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteCategory) return;
    await deleteMutation.mutateAsync(deleteCategory.id);
    setDeleteModalOpen(false);
    setDeleteCategory(null);
  };

  const handleSubmit = (data: { name: string }) => {
    if (editCategory) {
      updateMutation.mutate({ id: editCategory.id, data });
      setModalOpen(false);
    }
  };

  const canEdit = (cat: Category) => !isSystemCategory(cat.userId);

  const canDelete = (cat: Category) => {
    if (isSystemCategory(cat.userId)) return false;
    if (cat.expenseCount > 0) return false;
    return true;
  };

  const getDeleteTooltip = (cat: Category) => {
    if (isSystemCategory(cat.userId)) return 'System categories cannot be deleted';
    if (cat.expenseCount > 0) return `Cannot delete: used by ${cat.expenseCount} expense${cat.expenseCount > 1 ? 's' : ''}`;
    return '';
  };

  return (
    <div className='bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden'>
      <div className='flex items-center justify-between px-6 py-4 bg-base-200/50 border-b border-base-200'>
        <div className='grid grid-cols-[1fr,auto] gap-4 flex-1'>
          <span className='text-xs font-semibold text-base-content/50 uppercase tracking-wider'>Category</span>
          <span className='text-xs font-semibold text-base-content/50 uppercase tracking-wider text-right'>Owner</span>
        </div>
      </div>

      <div className='divide-y divide-base-200'>
        {data?.map((d) => (
          <div
            key={d.id}
            className={cn(
              'grid grid-cols-[1fr,auto,auto,auto] gap-4 px-6 py-4 items-center',
              'hover:bg-base-200/30 transition-colors duration-150'
            )}
          >
            <div className='flex items-center gap-3'>
              <div className={cn(
                'flex items-center justify-center w-9 h-9 rounded-lg',
                getCategoryColor(d.name)
              )}>
                <Tag className='w-4 h-4' />
              </div>
              <span className='font-medium text-base-content'>{d.name}</span>
            </div>

            <div className='flex justify-end'>
              {isSystemCategory(d.userId) ? <AdminBadge /> : <YouBadge />}
            </div>

            <div className='flex justify-end'>
              <div className={!canEdit(d) ? 'tooltip tooltip-left' : ''} data-tip={!canEdit(d) ? 'System categories cannot be edited' : ''}>
                <EditButton
                  onClick={() => canEdit(d) ? handleEdit(d) : undefined}
                  disabled={!canEdit(d)}
                />
              </div>
            </div>

            <div className='flex justify-end'>
              <div className={!canDelete(d) ? 'tooltip tooltip-left' : ''} data-tip={getDeleteTooltip(d)}>
                <DeleteButton
                  onClick={() => canDelete(d) ? handleDelete(d) : undefined}
                  disabled={!canDelete(d)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!data || data.length === 0) && (
        <div className='flex flex-col items-center justify-center py-12 px-4'>
          <div className='flex items-center justify-center w-12 h-12 rounded-xl bg-base-200 mb-3'>
            <Tag className='w-6 h-6 text-base-content/40' />
          </div>
          <p className='text-sm text-base-content/50'>No categories found</p>
        </div>
      )}

      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editCategory}
        loading={updateMutation.isPending}
      />

      <CategoryDeleteConfirmation
        open={deleteModalOpen}
        categoryName={deleteCategory?.name ?? ''}
        onClose={() => { setDeleteModalOpen(false); setDeleteCategory(null); }}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default CategoryTable;
