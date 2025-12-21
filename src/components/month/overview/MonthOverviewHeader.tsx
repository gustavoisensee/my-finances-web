import { Month as MonthType, Months } from '@/types/month';
import { Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';
import cn from 'classnames';

type Props = {
  month: MonthType;
  isBalanced: boolean;
  isOverBudget: boolean;
}

export default function MonthOverviewHeader({ month, isBalanced, isOverBudget }: Props) {
  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
      <div>
        <div className='flex items-center gap-3 mb-2'>
          <div className='flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10'>
            <Calendar className='w-6 h-6 text-primary' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-base-content'>
              {Months[month.value]}
            </h1>
            {month.description && (
              <p className='text-base-content/50 text-sm'>{month.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-xl border',
        isBalanced 
          ? 'bg-success/10 text-success border-success/30' 
          : isOverBudget
            ? 'bg-error/10 text-error border-error/30'
            : 'bg-warning/10 text-warning border-warning/30'
      )}>
        {isBalanced ? (
          <>
            <CheckCircle2 className='w-5 h-5' />
            <span className='font-medium'>Budget Balanced</span>
          </>
        ) : isOverBudget ? (
          <>
            <AlertTriangle className='w-5 h-5' />
            <span className='font-medium'>Over Budget</span>
          </>
        ) : (
          <>
            <AlertTriangle className='w-5 h-5' />
            <span className='font-medium'>Unassigned Income</span>
          </>
        )}
      </div>
    </div>
  );
}

