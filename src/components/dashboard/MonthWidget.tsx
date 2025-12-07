import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import cn from 'classnames';
import { ArrowRight, Sparkles, Banknote } from 'lucide-react';

import { Month, Months } from '@/types/month';
import { euro, getTotal } from '@/helpers/currency';
import MonthContextMenu from './MonthContextMenu';

type Props = {
  month: Month
}

const isItCurrentMonth = (month: number) =>
  (dayjs().month() + 1) === month;

const MonthWidget = ({ month }: Props) => {
  const isCurrent = isItCurrentMonth(month.value);
  const totalIncome = getTotal(month.incomes);
  const incomeCount = month.incomes?.length || 0;

  return (
    <div className={cn(
      'group relative flex flex-col w-full sm:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1rem)]',
      'm-2 rounded-2xl border bg-base-100',
      'transition-all duration-300',
      'hover:shadow-lg',
      'overflow-hidden',
      isCurrent 
        ? 'border-primary/30 shadow-md shadow-primary/10 hover:shadow-primary/20' 
        : 'border-base-300 shadow-sm hover:shadow-base-content/10'
    )}>
      {/* Decorative accent bar */}
      <div className={cn(
        'absolute top-0 left-0 w-1 h-full',
        isCurrent ? 'bg-primary' : 'bg-base-content/30'
      )} />

      <div className='p-5 pl-6'>
        {/* Header */}
        <div className='flex items-center gap-3 mb-1'>
          <h3 className='text-xl font-bold text-base-content tracking-tight'>
            {Months[month.value]}
          </h3>
          {isCurrent && (
            <div className='flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-content text-xs font-medium'>
              <Sparkles className='w-3 h-3' />
              Current
            </div>
          )}
          <div className='flex-1' />
          <MonthContextMenu month={month} />
        </div>
        {month.description && (
          <p className='text-sm text-base-content/50 line-clamp-1 mb-4'>
            {month.description}
          </p>
        )}
        {!month.description && <div className='mb-3' />}

        {/* Income Section */}
        <div className='flex items-center gap-3 p-3 rounded-xl bg-base-200/50 border border-base-300 mb-4'>
          <div className={cn(
            'flex items-center justify-center w-10 h-10 rounded-lg',
            isCurrent ? 'bg-primary' : 'bg-base-content/80'
          )}>
            <Banknote className='w-5 h-5 text-base-100' />
          </div>
          <div className='flex-1'>
            <p className='text-xs font-medium text-base-content/50 uppercase tracking-wider'>
              Total Income
            </p>
            <p className='text-lg font-bold text-base-content'>
              {euro(totalIncome)}
            </p>
          </div>
          {incomeCount > 0 && (
            <div className='text-right'>
              <span className='inline-flex items-center px-2 py-1 rounded-md bg-base-100 border border-base-300 text-xs font-medium text-base-content/70'>
                {incomeCount} source{incomeCount > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Action Link */}
        <Link
          to={`/month/${month.id}`}
          className={cn(
            'flex items-center justify-center gap-2 w-full py-2.5 px-4',
            'rounded-xl font-semibold text-sm',
            'transition-all duration-200',
            'bg-neutral text-neutral-content',
            'hover:bg-neutral/90 hover:gap-3',
            'focus:outline-none focus:ring-2 focus:ring-neutral/50 focus:ring-offset-2'
          )}
        >
          Open Details
          <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-0.5' />
        </Link>
      </div>
    </div>
  );
}

export default MonthWidget;
