import Loading from '@/components/Loading';
import MonthsWidget from '@/components/MonthsWidget';
import { useMonths } from '@/hooks/monthHooks';
import Year from '@/components/Year';

export default function Index() {
  const { data, isFetching, error } = useMonths();

  return (
    <div className='flex flex-1 flex-col '>
      <h3 className='text-2xl dark:text-white mb-4'>
        Dashboard
      </h3>

      <div className='bg-white p-3 rounded-lg h-full'>
        <div className='p-2'>
          <Year />
        </div>
        {isFetching && <Loading />}
        {!isFetching && error && <span>Sorry, we could not get the data. try again!</span>}
        {!isFetching && data && <MonthsWidget data={data.data} />}
      </div>
    </div>
  )
}
