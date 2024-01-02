import { useCallback } from 'react';

import { euro, getTotal } from '@/helpers/currency';
import { Income } from '@/types/month';
import DeleteButton from '../../shared/DeleteButton';
import MonthIncomeEditButton from './MonthIncomeEditButton';

type Props = {
  incomes: Income[]
}

const MonthIncomes = ({ incomes }: Props) => {
  const lastIndex = incomes.length - 1;
  const rowClassname = useCallback((index: number) => lastIndex !== index ? 'border-b' : '', [lastIndex]);

  return (
    <>
      <div className='border rounded-lg'>
        {incomes?.map?.((a, i) => (
          <div key={i} className={`flex flex-row justify-between py-2 px-4 hover:bg-gray-50 ${rowClassname(i)}`}>
            <div>{a.description}</div>
            <div className='flex flex-[1] justify-end mr-2'>
              {euro(a.value)}
            </div>
            <div className='w-14 sm:w-32 flex justify-end'>
              <MonthIncomeEditButton id={a.id}  />
              <DeleteButton onClick={() => alert('Delete Income - In Progrss')} />
            </div>
          </div>
        ))}
      </div>
      <div className='mt-2 p-2 border rounded-lg bg-green-50 w-fit'>
        Total incomes {euro(getTotal(incomes))}
      </div>
    </>
  );
};

export default MonthIncomes;