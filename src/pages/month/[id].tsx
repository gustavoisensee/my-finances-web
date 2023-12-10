import { useRouter } from 'next/router';
import styles from '@/styles/buttons.module.css';
import { useMonthById } from '@/hooks/monthHooks';
import Loading from '@/components/Loading';
import { Month } from '@/types/month';
import MonthOverview from '@/components/MonthOverview';
import CanNotFetchData from '@/components/CanNotFetchData';

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

      <div className='mt-6'>
        <button
          onClick={router.back}
          type='button'
          className={styles.btnTertiary}
        >
          Go back
        </button>
      </div>
    </div>
  )
}
