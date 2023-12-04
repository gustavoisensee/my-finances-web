import { useRouter } from 'next/router';
import styles from '@/styles/buttons.module.css';
import { useMonthById } from '@/hooks/monthHooks';
import Loading from '@/components/Loading';
import { Months } from '@/types/month';

export default function Index() {
  const router = useRouter();
  const id = router.query?.id || 0;
  const { data, isLoading, error } = useMonthById(Number(id));

  return (
    <div className='flex flex-1 flex-col'>
      {!isLoading && <h3 className='text-2xl dark:text-white mb-4'>
        {/* @ts-ignore */}
        Month of {Months[data?.data?.value]}
      </h3>}

      <div>
        {isLoading && <Loading />}
        {!isLoading && error && <span>Sorry, we could not get the data. try again!</span>}
        {!isLoading && data && (
          <div>
            Notes: {data.data.notes}
          </div>
        )}
      </div>

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
