import { euro } from '@/helpers/currency';
import { Expense } from '@/types/month';
import EditButton from './MonthBudgetExpenseEditButton';
import DeleteButton from './MonthBudgetExpenseDeleteButton';

type Props = {
  budgetId: number;
  expenses: Expense[]
}

const MonthBudgetExpenses = ({ budgetId, expenses }: Props) => {
  return (
    <>
      {expenses.map((e, i) => (
        <div key={i} className='flex justify-between py-2 pl-3 hover:bg-gray-50 border-b'>
          <div>{e.description}</div>
          <div className='flex flex-[1] justify-end mr-2'>
            {euro(e.value)}
          </div>
          <div className='w-14 sm:w-32 flex justify-end'>
            {e.id && <EditButton expense={e} budgetId={budgetId} />}
            {e.id && <DeleteButton id={e.id} />}
          </div>
        </div>
      ))}
    </>
  );
};

export default MonthBudgetExpenses;
