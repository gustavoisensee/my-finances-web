import { useCallback } from 'react';

import { euro, getTotal } from '@/helpers/currency';
import { Income } from '@/types/month';
import EditButton from './MonthIncomeEditButton';
import DeleteButton from './MonthIncomeDeleteButton';

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
              {a.id && <EditButton income={a}  />}
              {a.id && <DeleteButton id={a.id} />}
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