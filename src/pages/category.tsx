import CanNotFetchData from '@/components/CanNotFetchData';
import CategoryTable from '@/components/CategoryTable';
import Loading from '@/components/Loading';
import { useCategories } from '@/hooks/categoryHooks';

export default function Category() {
  const { data, isLoading, error } = useCategories();

  return (
    <div className='flex flex-1 flex-col'>
      <h3 className='text-2xl mb-4'>Category page</h3>

      <div>
        {isLoading && <Loading />}
        {!isLoading && error && <CanNotFetchData />}
        {!isLoading && data && <CategoryTable data={data.data} />}
      </div>
    </div>
  )
}
