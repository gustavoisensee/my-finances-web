import { euro } from '@/helpers/currency';
import { Expense } from '@/types/month';
import { Receipt } from 'lucide-react';
import EditButton from './MonthBudgetExpenseEditButton';
import DeleteButton from './MonthBudgetExpenseDeleteButton';

type Props = {
  budgetId: number;
  expenses: Expense[]
}

const MonthBudgetExpenses = ({ budgetId, expenses }: Props) => {
  return (
    <div className='divide-y divide-base-300 border border-base-300 rounded-lg overflow-hidden bg-base-100'>
      {expenses.map((expense, i) => (
        <div 
          key={i} 
          className='flex items-center gap-3 p-3 hover:bg-base-200/50 transition-colors'
        >
          <div className='flex items-center justify-center w-8 h-8 rounded-md bg-base-200'>
            <Receipt className='w-4 h-4 text-base-content/50' />
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-base-content truncate'>{expense.description}</p>
          </div>
          <div className='text-right'>
            <p className='text-sm font-semibold text-base-content'>{euro(expense.value)}</p>
          </div>
          <div className='flex items-center gap-1'>
            {expense.id && <EditButton expense={expense} budgetId={budgetId} />}
            {expense.id && <DeleteButton id={expense.id} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthBudgetExpenses;
