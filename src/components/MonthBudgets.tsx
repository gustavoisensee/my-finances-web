import { euro, getTotal } from '@/helpers/currency';
import { Budget } from '@/types/month';
import React from 'react';
import MonthBudgetExpenses from './MonthBudgetExpenses';
import { getTotals } from '@/helpers/totals';
import { EditButton } from './EditButton';
import { DeleteButton } from './DeleteButton';
import Plus from './svgs/Plus';

type Props = {
  budgets: Budget[]
}

const MonthBudgets = ({ budgets }: Props) => {
  const { totalExpenses, totalBudgets } = getTotals(budgets);

  return (
    <>
      {budgets.map((a, i) => (
        <div key={i} className='mb-2 border rounded-lg cursor-pointer'>
          <div className='hs-collapse-toggle flex justify-between py-3 px-4 items-center text-sm font-semibold rounded-lg text-black hover:bg-grey-700 disabled:opacity-50 disabled:pointer-events-none w-full' id='hs-basic-collapse' data-hs-collapse={`#hs-basic-collapse-heading-${i}`}>
            <div>
              {a.description}
            </div>
            <div className='flex flex-[1] justify-end mr-2'>
              <span>
                {euro(a.value)}
              </span>
            </div>
            <div className='w-15 sm:w-32 flex justify-end'>
              <EditButton onClick={() => alert('Budget Edit - In Progress!')} />
              <DeleteButton onClick={() => alert('Budget Delete - In Progress!')} />
            </div>
          </div>
          <div id={`hs-basic-collapse-heading-${i}`} className='hs-collapse hidden w-full overflow-hidden transition-[height] duration-300' aria-labelledby='hs-basic-collapse'>
            <div className='flex flex-col px-4 pb-1 m-0 text-gray-500 text-sm'>
              {a.expenses?.length === 0 && <div className='pl-2'>No expenses entered yet!</div>}
              {a.expenses?.length > 0 && <MonthBudgetExpenses expenses={a.expenses} />}
            </div>
            <div className='px-2 pl-6 pb-4'>
              <button
                type='button'
                onClick={() => alert('Expense Add - In Progress')}
                className='py-1 px-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'
              >
                <Plus />
                New expense
              </button>
            </div>
          </div>

          <div className='flex justify-between px-4 pb-2 pt-2 border-t'>
            <div>
              <span className='text-sm text-yellow-700'>
                Total left
              </span>
            </div>
            <div className='flex flex-[1] justify-end mr-2'>
              <span className='text-sm text-yellow-700'>
                {euro(a.value - getTotal(a.expenses))}
              </span>
            </div>
            <div className='w-14 sm:w-32 flex justify-end'>&nbsp;</div>
          </div>
        </div>
      ))}

      <div className='flex flex-row justify-between'>
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