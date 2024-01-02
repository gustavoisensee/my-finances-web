import { Month as MonthType } from '@/types/month';
import { euro, getTotal } from '@/helpers/currency';
import { getTotals } from '@/helpers/totals';

type Props = {
  month: MonthType
}

export default function MonthWidget({ month }: Props) {
  const { totalBudgets, totalExpenses } = getTotals(month.budgets);

  return (
    <div className='flex flex-col'>
      <span className='font-bold'>Widgets</span>
      <div className='flex mt-1'>
        <div className='flex flex-col rounded border p-3 mr-4 bg-green-50'>
          <span>Total income</span>
          <div>
            {euro(getTotal(month.incomes))}
          </div>
        </div>
        <div className='flex flex-col rounded border p-3 mr-4 bg-violet-50'>
          <span>Total budget</span>
          <div>
            {euro(totalBudgets)}
          </div>
        </div>
        <div className='flex flex-col rounded border p-3 bg-yellow-100 w-fit'>
          <span>Total budgets left</span>
          {euro(totalBudgets - totalExpenses)}
        </div>
      </div>
    </div>
  )
}
