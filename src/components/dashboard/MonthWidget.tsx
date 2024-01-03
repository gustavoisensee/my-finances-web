import Link from 'next/link';
import dayjs from 'dayjs';
import cn from 'classnames';

import { Month, Months } from '@/types/month';
import { euro, getTotal } from '@/helpers/currency';
import MonthDeleteConfirmation from './MonthContextMenu';

type Props = {
  month: Month
}

const isItCurrentMonth = (month: number) =>
  (dayjs().month() + 1) === month;

const MonthWidget = ({ month }: Props) => {
  return (
    <div className={cn(
      'flex flex-1 min-w-24 lg:max-w-[35%]',
      'm-2 flex-col border shadow-sm rounded-xl',
      isItCurrentMonth(month.value) ? 'bg-blue-50' : 'bg-white'
    )}>
      <div className='p-4 md:p-5'>
        <div className='flex items-top justify-between'>
          <h3 className='text-lg font-bold text-gray-800'>
            {Months[month.value]}
          </h3>
          <MonthDeleteConfirmation month={month} />
        </div>
        <p className='mt-2 text-gray-500'>
          {month.description}
        </p>
        <div className='flex justify-between mt-2'>
          <div className='flex flex-col'>
            <span>
              Income
            </span>
            {euro(getTotal(month.incomes))}
          </div>
        </div>
        <Link
          className={cn(
            'mt-3 inline-flex items-center gap-x-1 text-sm',
            'font-semibold rounded-lg border border-transparent',
            'text-blue-600 hover:text-blue-800',
            'disabled:opacity-50 disabled:pointer-events-none'
          )}
          href={`/month/${month.id}`}
        >
          Open month
          <svg
            className='flex-shrink-0 w-4 h-4'
            xmlns='http://www.w3.org/2000/svg'
            width='24' height='24' viewBox='0 0 24 24'
            fill='none' stroke='currentColor'
            strokeWidth='2' strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m9 18 6-6-6-6' />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default MonthWidget;