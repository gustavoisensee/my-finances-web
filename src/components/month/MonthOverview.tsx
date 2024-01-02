import { Month as MonthType, Months } from '@/types/month';
import MonthBudgets from './budgets/MonthBudgets';
import MonthIncomes from './incomes/MonthIncomes';
import MonthWidget from './MonthWidget';
import MonthAlert from './MonthAlert';
import AddBudget from './budgets/MonthBudgetAddButton';
import AddIncome from './incomes/MonthIncomeAddButton';

type Props = {
  month: MonthType
}

export default function MonthOverview({ month }: Props) {
  return (
    <>
      <h3 className='text-2xl mb-4'>
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
          <AddIncome />
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
          <AddBudget />
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
