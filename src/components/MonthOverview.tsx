import { Month as MonthType, Months } from '@/types/month';
import MonthBudgets from './MonthBudgets';
import MonthIncomes from './MonthIncomes';
import Plus from './svgs/Plus';
import { euro, getTotal } from '@/helpers/currency';
import { getTotals } from '@/helpers/totals';
import { AddButton } from './AddButton';
import ThumbsUp from './svgs/ThumbsUp';
import ThumbsDown from './svgs/ThumbsDown';

type Props = {
  month: MonthType
}

export default function MonthOverview({ month }: Props) {
  const totalIncome = getTotal(month.incomes);
  const { totalBudgets, totalExpenses } = getTotals(month.budgets);
  return (
    <>
      <div className='bg-white rounded-xl p-4 max-w-4xl'>
        <h3 className='text-2xl mb-4'>
          {/* @ts-ignore */}
          Month of {Months[month.value]}
        </h3>
        <div className='flex flex-col'>
          <span className='font-bold'>Description</span>
          {month.description}
        </div>
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
              <span className='ml-2'>Make sure your total of incomes is equal to total of budgets</span>
            </div>
          )}

        </div>
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
      </div>

      <div className='bg-white rounded-xl p-4 mt-4 max-w-4xl'>
        <div className='flex flex-row items-center mb-2'>
          <h3 className='text-2xl mr-2'>
            Incomes
          </h3>
          <AddButton onClick={() => alert('Income - In Progress!')} />
        </div>
        <div>
          {month?.incomes?.length > 0 && (
            <MonthIncomes incomes={month.incomes} />
          )}
        </div>
      </div>

      <div className='bg-white rounded-xl p-4 mt-4 max-w-4xl'>
        <div className='flex flex-row items-center mb-2'>
          <h3 className='text-2xl mr-2'>
            Budgets
          </h3>
          <AddButton onClick={() => alert('Budget - In Progress!')} />
        </div>
        <div>
          {month?.budgets?.length > 0 && (
            <MonthBudgets budgets={month.budgets} />
          )}
        </div>
      </div>
    </>
  )
}
