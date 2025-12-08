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
          className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-base-200/50 transition-colors'
        >
          {/* Top row on mobile: Description, Actions (icon hidden on mobile) */}
          <div className='flex items-center gap-3 w-full sm:w-auto sm:flex-1 sm:min-w-0'>
            <div className='hidden sm:flex items-center justify-center w-8 h-8 shrink-0 rounded-md bg-base-200'>
              <Receipt className='w-4 h-4 text-base-content/50' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-base-content truncate'>{expense.description}</p>
            </div>
            {/* Actions on mobile - in top row */}
            <div className='flex sm:hidden items-center gap-1'>
              {expense.id && <EditButton expense={expense} budgetId={budgetId} />}
              {expense.id && <DeleteButton id={expense.id} />}
            </div>
          </div>
          
          {/* Bottom row on mobile: Value | Desktop: Value + Actions */}
          <div className='flex items-center justify-between sm:justify-end gap-3 sm:pl-0'>
            <div className='text-left sm:text-right'>
              <p className='text-sm font-semibold text-base-content'>{euro(expense.value)}</p>
            </div>
            {/* Actions on desktop */}
            <div className='hidden sm:flex items-center gap-1'>
              {expense.id && <EditButton expense={expense} budgetId={budgetId} />}
              {expense.id && <DeleteButton id={expense.id} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthBudgetExpenses;
