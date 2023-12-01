import CategoryTable from '@/components/CategoryTable';
import Loading from '@/components/Loading';
import { useCategories } from '@/hooks/categoryHooks';

export default function Category() {
  const { data, isLoading, error } = useCategories();

  return (
    <div>
      <h3 className='text-2xl dark:text-white mb-4'>Category page</h3>

      <div>
        {isLoading && <Loading />}
        {!isLoading && error && <span>Sorry, we could not get the data. try again!</span>}
        {!isLoading && data && <CategoryTable data={data.data} />}
      </div>
    </div>
  )
}
