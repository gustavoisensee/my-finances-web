import Loading from '@/components/Loading';
import MonthsWidget from '@/components/MonthsWidget';
import { useMonths } from '@/hooks/monthHooks';

export default function Index() {
  const { data, isLoading, error } = useMonths();

  return (
    <div className='flex flex-1 flex-col'>
      <h3 className='text-2xl dark:text-white mb-4'>
        Dashboard
      </h3>

      {isLoading && <Loading />}
      {!isLoading && error && <span>Sorry, we could not get the data. try again!</span>}
      {!isLoading && data && <MonthsWidget data={data.data} />}
    </div>
  )
}
