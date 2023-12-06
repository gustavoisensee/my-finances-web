import Link from 'next/link';
import currency from 'currency.js';
import dayjs from 'dayjs';

import { Budget, Income, Month, Months } from '@/types/month';
import Year from './Year';

type Props = {
  data: Month[]
}

const getTotal = (array: Budget[] | Income[]): number =>
  array?.reduce((p, c) => p + c.value, 0) || 0;

const euro = (value: number) => currency(value, { symbol: '€', decimal: ',', separator: '.' }).format();

const isItCurrentMonth = (month: number) =>
  (dayjs().month() + 1) === month;

const MonthsWidget = ({ data }: Props) => (
  <div className='flex flex-row bg-white rounded-lg h-full'>
    {data?.map((d, i) => (
      <div key={i} className={`m-2 flex h-fit flex-col border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] ${isItCurrentMonth(d.value) ? 'bg-blue-50' : 'bg-white'}`}>
        <div className='p-4 md:p-5'>
          <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
            {/* @ts-ignore */}
            {Months[d.value]}
          </h3>
          <p className='mt-2 text-gray-500 dark:text-gray-400'>
            {d.notes}
          </p>
          <div className='flex justify-between mt-2'>
            <div className='flex flex-col'>
              <span>
                Income
              </span>
              {euro(getTotal(d.incomes))}
            </div>
          </div>
          <Link
            className='mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
            href={`/month/${d.id}`}
          >
            Open month
            <svg className='flex-shrink-0 w-4 h-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='m9 18 6-6-6-6' /></svg>
          </Link>
        </div>
      </div>
    ))}
  </div>
);

export default MonthsWidget;