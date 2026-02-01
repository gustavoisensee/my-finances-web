
import CanNotFetchData from '@/components/shared/CanNotFetchData';
import CategoryTable from '@/components/category/CategoryTable';
import Loading from '@/components/shared/Loading';
import { useCategories } from '@/hooks/categoryHooks';
import { FolderKanban } from 'lucide-react';
import Toast from '@/components/shared/Toast';

export default function CategoryPage() {
  const { data, isFetching, error } = useCategories();
  const categoryCount = data?.length || 0;

  return (
    <div className='flex flex-1 flex-col gap-6'>
      <Toast />
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-bold text-base-content'>
            Categories
          </h1>
          <p className='text-base-content/50'>
            Organize your expenses with custom categories
          </p>
        </div>

        {/* Stats badge */}
        {!isFetching && data && (
          <div className='flex items-center gap-3 px-4 py-2 bg-base-100 rounded-xl border border-base-300 shadow-sm'>
            <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10'>
              <FolderKanban className='w-5 h-5 text-primary' />
            </div>
            <div>
              <p className='text-2xl font-bold text-base-content'>{categoryCount}</p>
              <p className='text-xs text-base-content/50'>Total categories</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        {isFetching && <Loading />}
        {!isFetching && error && <CanNotFetchData />}
        {!isFetching && data && <CategoryTable data={data} />}
      </div>
    </div>
  )
}
