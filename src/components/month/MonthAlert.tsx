import { Month as MonthType } from '@/types/month';
import { getTotal } from '@/helpers/currency';
import { getTotals } from '@/helpers/totals';
import ThumbsUp from '../svgs/ThumbsUp';
import ThumbsDown from '../svgs/ThumbsDown';

type Props = {
  month: MonthType
}

export default function MonthAlert({ month }: Props) {
  const totalIncome = getTotal(month.incomes);
  const { totalBudgets } = getTotals(month.budgets);
  return (
    <div className='flex flex-col my-4'>
      <span className='font-bold'>Alert</span>
      {totalIncome === totalBudgets ? (
        <div className='flex w-fit p-2 mt-1 items-center bg-green-100 rounded-lg'>
          <ThumbsUp />
          <span className='ml-2'>You are all set</span>
        </div>
      ) : (
        <div className='flex w-fit p-2 mt-1 items-center bg-red-100 rounded-lg'>
          <ThumbsDown />
          <span className='ml-2'>
            Make sure your total of incomes is equal to total of budgets
          </span>
        </div>
      )}
    </div>
  )
}
