import { euro, getTotal } from '@/helpers/currency';
import { Budget } from '@/types/month';
import { getTotals } from '@/helpers/totals';
import { ChevronDown, Wallet, Receipt } from 'lucide-react';
import cn from 'classnames';
import MonthBudgetExpenses from './expenses/MonthBudgetExpenses';
import EditBudget from './MonthBudgetEditButton';
import AddExpense from './expenses/MonthBudgetExpenseAddButton';
import DeleteBudget from './MonthBudgetDeleteButton';

type Props = {
  budgets: Budget[]
}

const MonthBudgets = ({ budgets }: Props) => {
  const { totalExpenses, totalBudgets } = getTotals(budgets);
  const remaining = totalBudgets - totalExpenses;

  return (
    <div className='flex flex-col gap-4'>
      {/* Budget List */}
      <div className='space-y-3'>
        {budgets.map((budget, i) => {
          const budgetRemaining = budget.value - getTotal(budget.expenses);
          const expenseCount = budget.expenses?.length || 0;
          
          return (
            <div key={i} className='border border-base-300 rounded-xl overflow-hidden bg-base-100'>
              <div className='collapse'>
                <input type='checkbox' name={`budget-${i}`} className='min-h-0' />
                
                {/* Budget Header */}
                <div className='collapse-title flex items-center gap-4 p-4 min-h-0'>
                  <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10'>
                    <Wallet className='w-5 h-5 text-secondary' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='font-medium text-base-content'>{budget.description}</p>
                    <p className='text-xs text-base-content/50'>{expenseCount} expense{expenseCount !== 1 ? 's' : ''}</p>
                  </div>
                  <div className='text-right mr-2'>
                    <p className='font-semibold text-base-content'>{euro(budget.value)}</p>
                    <p className={cn(
                      'text-xs font-medium',
                      budgetRemaining >= 0 ? 'text-success' : 'text-error'
                    )}>
                      {budgetRemaining >= 0 ? `${euro(budgetRemaining)} left` : `${euro(Math.abs(budgetRemaining))} over`}
                    </p>
                  </div>
                  <div className='flex items-center gap-1'>
                    {budget.id && <EditBudget budget={budget} />}
                    {budget.id && <DeleteBudget id={budget.id} />}
                  </div>
                  <ChevronDown className='w-5 h-5 text-base-content/40 transition-transform' />
                </div>

                {/* Expenses Content */}
                <div className='collapse-content p-0 bg-base-200/30'>
                  <div className='p-4 pt-2'>
                    {expenseCount === 0 ? (
                      <div className='text-center py-6 text-base-content/50'>
                        <Receipt className='w-6 h-6 mx-auto mb-2 opacity-30' />
                        <p className='text-sm'>No expenses recorded</p>
                      </div>
                    ) : (
                      <MonthBudgetExpenses budgetId={budget.id || 0} expenses={budget.expenses} />
                    )}

                    {/* Add Expense Button */}
                    <div className='mt-3 pt-3 border-t border-base-300'>
                      <AddExpense budgetId={budget.id || 0} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Totals */}
      <div className='grid grid-cols-2 gap-3'>
        <div className='flex items-center justify-between p-4 bg-secondary/10 rounded-xl border border-secondary/20'>
          <span className='font-medium text-secondary'>Total Budgets</span>
          <span className='text-xl font-bold text-secondary'>{euro(totalBudgets)}</span>
        </div>
        <div className={cn(
          'flex items-center justify-between p-4 rounded-xl border',
          remaining >= 0 
            ? 'bg-warning/10 border-warning/20' 
            : 'bg-error/10 border-error/20'
        )}>
          <span className={cn(
            'font-medium',
            remaining >= 0 ? 'text-warning' : 'text-error'
          )}>Remaining</span>
          <span className={cn(
            'text-xl font-bold',
            remaining >= 0 ? 'text-warning' : 'text-error'
          )}>{euro(remaining)}</span>
        </div>
      </div>
    </div>
  );
};

export default MonthBudgets;
