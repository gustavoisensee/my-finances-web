import { euro } from '@/helpers/currency';
import { Expense } from '@/types/month';
import { useCallback } from 'react';
import { EditButton } from '../shared/EditButton';
import { DeleteButton } from '../shared/DeleteButton';

type Props = {
  expenses: Expense[]
}

const MonthBudgetExpenses = ({ expenses }: Props) => {
  const lastIndex = expenses.length - 1;
  const rowClassname = useCallback((index: number) => lastIndex !== index ? 'border-b' : '', [lastIndex]);

  return (
    <>
      {expenses.map((e, i) => (
        <div key={i} className={`flex justify-between py-2 pl-3 hover:bg-gray-50 ${rowClassname(i)}`}>
          <div>{e.description}</div>
          <div className='flex flex-[1] justify-end mr-2'>
            {euro(e.value)}
          </div>
          <div className='w-14 sm:w-32 flex justify-end'>
            <EditButton onClick={() => alert('Expense Edit - In Progress!')} />
            <DeleteButton onClick={() => alert('Expense Delete - In Progress!')} />
          </div>
        </div>
      ))}
    </>
  );
};

export default MonthBudgetExpenses;
