import { euro, getTotal } from '@/helpers/currency';
import { Budget } from '@/types/month';
import React from 'react';
import MonthBudgetExpenses from './MonthBudgetExpenses';
import { getTotals } from '@/helpers/totals';

type Props = {
  budgets: Budget[]
}

const MonthBudgets = ({ budgets }: Props) => {
  const { totalExpenses, totalBudgets } = getTotals(budgets);

  return (
    <>
      {budgets.map((a, i) => (
        <div key={i} className='mb-2 border rounded-lg'>
          <button type='button' className='hs-collapse-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg text-black hover:bg-grey-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 w-full' id='hs-basic-collapse' data-hs-collapse={`#hs-basic-collapse-heading-${i}`}>
            <span className='min-w-300'>
              {a.description}
            </span>
            <span>
              {euro(a.value)}
            </span>
          </button>
          <div id={`hs-basic-collapse-heading-${i}`} className='hs-collapse hidden w-full overflow-hidden transition-[height] duration-300' aria-labelledby='hs-basic-collapse'>
            <div className='flex flex-col px-5 pb-4 m-0 text-gray-500 text-sm'>
              {a.expenses?.length === 0 && <div>No expenses entered yet!</div>}
              {a.expenses?.length > 0 && <MonthBudgetExpenses expenses={a.expenses} />}
            </div>
          </div>

          <div className='px-4 pb-2 pt-1 border-t'>
            <span className='text-sm text-yellow-700'>
              Total left: {euro(a.value - getTotal(a.expenses))}
            </span>
          </div>
        </div>
      ))}

      <div className='flex flex-row'>
        <div className='mb-2 p-2 border rounded-lg bg-violet-50 w-fit'>
          Total budgets {euro(totalBudgets)}
        </div>
        <div className='mb-2 p-2 ml-2 border rounded-lg bg-yellow-100 w-fit'>
          Total budgets left {euro(totalBudgets - totalExpenses)}
        </div>
      </div>
    </>
  );
};

export default MonthBudgets;