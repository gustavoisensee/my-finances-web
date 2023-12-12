import { Month as MonthType, Months } from '@/types/month';
import MonthBudgets from './MonthBudgets';
import MonthIncomes from './MonthIncomes';
import { AddButton } from '../shared/AddButton';
import MonthWidget from './MonthWidget';
import MonthAlert from './MonthAlert';

type Props = {
  month: MonthType
}

export default function MonthOverview({ month }: Props) {
  return (
    <>
      <h3 className='text-2xl mb-4'>
        {/* @ts-ignore */}
        Month of {Months[month.value]}
      </h3>

      <div className='bg-white rounded-xl p-4 max-w-4xl'>
        <div className='flex flex-col'>
          <span className='font-bold'>Description</span>
          {month.description}
        </div>
        <MonthAlert month={month} />
        <MonthWidget month={month} />
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
