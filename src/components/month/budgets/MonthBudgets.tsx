import React, { useCallback } from 'react';

import { euro, getTotal } from '@/helpers/currency';
import { Budget } from '@/types/month';
import { getTotals } from '@/helpers/totals';
import MonthBudgetExpenses from './expenses/MonthBudgetExpenses';
import EditBudget from './MonthBudgetEditButton';
import AddExpense from './expenses/MonthBudgetExpenseAddButton';
import DeleteBudget from './MonthBudgetDeleteButton';

type Props = {
  budgets: Budget[]
}

const MonthBudgets = ({ budgets }: Props) => {
  const { totalExpenses, totalBudgets } = getTotals(budgets);
  const lastIndex = budgets.length - 1;
  const rowClassname = useCallback((index: number) =>
    lastIndex !== index ? 'border-b' : '', [lastIndex]);

  return (
    <>
      <div className='border rounded-lg mb-2'>
        {budgets.map((b, i) => (
          <div key={i} className={`cursor-pointer ${rowClassname(i)}`}>
            <div className='collapse bg-white'>
              <input type='checkbox' name='my-accordion-2' className='min-h-0' />

              <div className='collapse-title flex px-4 py-2 items-center'>
                <div>
                  {b.description}
                </div>
                <div className='flex flex-[1] justify-end mr-2'>
                  <span>
                    {euro(b.value)}
                  </span>
                </div>
                <div className='w-15 sm:w-32 flex justify-end'>
                  {b.id && <EditBudget budget={b} />}
                  {b.id && <DeleteBudget id={b.id} />}
                </div>
              </div>
              <div className='collapse-content flex flex-col p-0 bg-slate-50'>
                <div className='flex flex-col px-4 pb-0 m-0 text-gray-500 text-sm'>
                  {b.expenses?.length === 0 && <div className='pl-2 py-2'>No expenses entered yet!</div>}
                  {b.expenses?.length > 0 && <MonthBudgetExpenses budgetId={b.id || 0} expenses={b.expenses} />}
                </div>

                <div className='flex justify-between px-4 pb-2 pl-7 py-2'>
                  <div>
                    <span className='text-sm text-yellow-700'>
                      Total left
                    </span>
                  </div>
                  <div className='flex flex-[1] justify-end mr-2'>
                    <span className='text-sm text-yellow-700'>
                      {euro(b.value - getTotal(b.expenses))}
                    </span>
                  </div>
                  <div className='w-14 sm:w-32 flex justify-end'>&nbsp;</div>
                </div>

                <div className='px-2 pl-6'>
                  <AddExpense budgetId={b.id || 0} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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