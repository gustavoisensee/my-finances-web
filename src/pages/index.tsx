import Loading from '@/components/Loading';
import MonthsWidget from '@/components/MonthsWidget';
import { useMonths } from '@/hooks/monthHooks';
import Year from '@/components/Year';
import CanNotFetchData from '@/components/CanNotFetchData';
import MonthsEmpty from '@/components/MonthsEmpty';

export default function Index() {
  const { data, isFetching, error } = useMonths();

  return (
    <div className='flex flex-1 flex-col '>
      <h3 className='text-2xl mb-4'>
        Dashboard
      </h3>

      <div className='flex flex-col bg-white p-3 rounded-lg'>
        <div className='p-2'>
          <Year />
        </div>
        {isFetching && <Loading />}
        {!isFetching && error && <CanNotFetchData />}
        {!isFetching && data && <MonthsWidget data={data.data} />}
        {!isFetching && data?.data?.length === 0 && <MonthsEmpty /> }
      </div>
    </div>
  )
}
