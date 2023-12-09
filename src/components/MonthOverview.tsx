import { Month as MonthType, Months } from '@/types/month';
import MonthBudgets from './MonthBudgets';
import MonthIncomes from './MonthIncomes';
import Plus from './svgs/Plus';
import { euro, getTotal } from '@/helpers/currency';

type Props = {
  month: MonthType
}

export default function MonthOverview({ month }: Props) {
  return (
    <>
      <div className='bg-white rounded-xl p-4'>
        <h3 className='text-2xl dark:text-white mb-4'>
          {/* @ts-ignore */}
          Month of {Months[month.value]}
        </h3>
        <div>
          Notes: {month.notes}
        </div>
        <div>
          <span>Make sure your total of incomes is equal to total of budgets</span>
        </div>
        <div className='flex mt-2'>
          <div className='flex flex-col rounded border p-3 mr-4 bg-green-50'>
            <span>Total income</span>
            <div>
              {euro(getTotal(month.incomes))}
            </div>
          </div>
          <div className='flex flex-col rounded border p-3 bg-violet-50'>
            <span>Total budget</span>
            <div>
              {euro(getTotal(month.budgets))}
            </div>
          </div>
        </div>
      </div>


      {month?.incomes?.length > 0 && (
        <div className='bg-white rounded-xl p-4 mt-4'>
          <h3 className='text-2xl dark:text-white mb-4'>
            Incomes
          </h3>
          <div>
            <MonthIncomes incomes={month.incomes} />
          </div>
        </div>
      )}

      {month?.budgets?.length > 0 && (
        <div className='bg-white rounded-xl p-4 mt-4'>
          <div className='flex flex-row items-center mb-2'>
            <h3 className='text-2xl dark:text-white mr-2'>
              Budgets
            </h3>
            <button type='button' className='flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
              <Plus />
            </button>
          </div>
          <div>
            <MonthBudgets budgets={month.budgets} />
          </div>
        </div>)}
    </>
  )
}
