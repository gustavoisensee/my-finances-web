import { USER_ADMIN } from '@/constants';
import { Category } from '@/types/category';
import { Tag, Shield, User } from 'lucide-react';
import cn from 'classnames';

const isAdmin = (id: number) => id === USER_ADMIN;

type Props = {
  data: Category[]
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

// Get a consistent color based on category name - using theme-compatible colors
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

const CategoryTable = ({ data }: Props) => (
  <div className='bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden'>
    {/* Table Header */}
    <div className='grid grid-cols-[1fr,auto] gap-4 px-6 py-4 bg-base-200/50 border-b border-base-200'>
      <span className='text-xs font-semibold text-base-content/50 uppercase tracking-wider'>Category</span>
      <span className='text-xs font-semibold text-base-content/50 uppercase tracking-wider text-right'>Owner</span>
    </div>

    {/* Table Body */}
    <div className='divide-y divide-base-200'>
      {data?.map((d, i) => (
        <div 
          key={i} 
          className={cn(
            'grid grid-cols-[1fr,auto] gap-4 px-6 py-4 items-center',
            'hover:bg-base-200/30 transition-colors duration-150'
          )}
        >
          {/* Category name with icon */}
          <div className='flex items-center gap-3'>
            <div className={cn(
              'flex items-center justify-center w-9 h-9 rounded-lg',
              getCategoryColor(d.name)
            )}>
              <Tag className='w-4 h-4' />
            </div>
            <span className='font-medium text-base-content'>{d.name}</span>
          </div>

          {/* Owner badge */}
          <div className='flex justify-end'>
            {isAdmin(d.userId) ? <AdminBadge /> : <YouBadge />}
          </div>
        </div>
      ))}
    </div>

    {/* Empty state */}
    {(!data || data.length === 0) && (
      <div className='flex flex-col items-center justify-center py-12 px-4'>
        <div className='flex items-center justify-center w-12 h-12 rounded-xl bg-base-200 mb-3'>
          <Tag className='w-6 h-6 text-base-content/40' />
        </div>
        <p className='text-sm text-base-content/50'>No categories found</p>
      </div>
    )}
  </div>
);

export default CategoryTable;
