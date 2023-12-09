import { euro, getTotal } from '@/helpers/currency';
import { Budget } from '@/types/month';
import React from 'react';

type Props = {
  budgets: Budget[]
}

const MonthBudgets = ({ budgets }: Props) => {
  return (
    <>
      {budgets.map((a, i) => (
        <div key={i} className='mb-2 border rounded-lg'>
          <button type='button' className='hs-collapse-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg text-black hover:bg-grey-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 w-full' id='hs-basic-collapse' data-hs-collapse={`#hs-basic-collapse-heading-${i}`}>
            <span className='min-w-300'>
              {a.name}
            </span>
            {euro(a.value)}
          </button>
          <div id={`hs-basic-collapse-heading-${i}`} className='hs-collapse hidden w-full overflow-hidden transition-[height] duration-300' aria-labelledby='hs-basic-collapse'>
            <div className='px-5 pb-4 m-0'>
              <p className='text-gray-500 dark:text-gray-400'>
                This is a collapse body. It is h...
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className='mb-2 p-2 border rounded-lg bg-violet-50 w-fit'>
        {euro(getTotal(budgets))}
      </div>
    </>
  );
};

export default MonthBudgets;