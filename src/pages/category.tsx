import CanNotFetchData from '@/components/shared/CanNotFetchData';
import CategoryTable from '@/components/category/CategoryTable';
import Loading from '@/components/shared/Loading';
import { useCategories } from '@/hooks/categoryHooks';

export default function Category() {
  const { data, isFetching, error } = useCategories();

  return (
    <div className='flex flex-1 flex-col'>
      <h3 className='text-2xl mb-4'>Category page</h3>

      <div>
        {isFetching && <Loading />}
        {!isFetching && error && <CanNotFetchData />}
        {!isFetching && data && <CategoryTable data={data} />}
      </div>
    </div>
  )
}
