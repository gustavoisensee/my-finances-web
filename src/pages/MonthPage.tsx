import { useParams } from 'react-router-dom';
import { useMonthById } from '@/hooks/monthHooks';
import Loading from '@/components/shared/Loading';
import MonthOverview from '@/components/month/MonthOverview';
import CanNotFetchData from '@/components/shared/CanNotFetchData';
import BackButton from '@/components/shared/BackButton';

export default function MonthPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useMonthById(Number(id));
  const month = data;

  return (
    <div className='flex flex-1 flex-col align-center'>
      <div className='my-1'>
        <BackButton label='Dashboard' />
      </div>
      {isLoading && <Loading />}
      {!isLoading && error && <CanNotFetchData />}
      {!isLoading && month && <MonthOverview month={month} />}
    </div>
  )
}


