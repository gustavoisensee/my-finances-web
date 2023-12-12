import { useRouter } from 'next/router';
import styles from '@/styles/buttons.module.css';
import { useMonthById } from '@/hooks/monthHooks';
import Loading from '@/components/shared/Loading';
import { Month } from '@/types/month';
import MonthOverview from '@/components/month/MonthOverview';
import CanNotFetchData from '@/components/shared/CanNotFetchData';
import BackButton from '@/components/shared/BackButton';

export default function Index() {
  const router = useRouter();
  const id = router.query?.id || 0;
  const { data, isLoading, error } = useMonthById(Number(id));
  const month: Month = data?.data;

  return (
    <div className='flex flex-1 flex-col align-center'>
      {isLoading && <Loading />}
      {!isLoading && error && <CanNotFetchData />}
      {!isLoading && month && <MonthOverview month={month} />}

      <div className='my-8'>
        <BackButton />
      </div>
    </div>
  )
}
