import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { euro, getTotal } from '@/helpers/currency';
import { Budget } from '@/types/month';
import { getTotals } from '@/helpers/totals';
import { ChevronDown, Wallet, Receipt } from 'lucide-react';
import cn from 'classnames';
import MonthBudgetExpenses from './expenses/MonthBudgetExpenses';
import EditBudget from './MonthBudgetEditButton';
import AddExpense from './expenses/MonthBudgetExpenseAddButton';
import DeleteBudget from './MonthBudgetDeleteButton';
import SortableItem from '@/components/shared/SortableItem';
import { useReorderBudgets } from '@/hooks/reorderHooks';

type Props = {
  budgets: Budget[]
}

const MonthBudgets = ({ budgets }: Props) => {
  const { totalBudgets } = getTotals(budgets);
  const { orderedBudgets, handleDragEnd } = useReorderBudgets(budgets);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const budgetIds = orderedBudgets
    .map((budget) => budget.id)
    .filter((id): id is number => id !== undefined);

  return (
    <div className='flex flex-col gap-4'>
      {/* Budget List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={budgetIds} strategy={verticalListSortingStrategy}>
          <div className='space-y-3'>
            {orderedBudgets.map((budget) => {
              const budgetRemaining = budget.value - getTotal(budget.expenses);
              const expenseCount = budget.expenses?.length || 0;
              const hasColor = !!budget.color;
              
              return (
                <SortableItem key={budget.id} id={budget.id || 0}>
                  <div 
                    className={cn(
                      'rounded-xl overflow-hidden bg-base-100',
                      !hasColor && 'border-base-300'
                    )}
                    style={hasColor ? { borderColor: `${budget.color}40` } : undefined}
                  >
                    <div className='collapse'>
                      <input type='checkbox' name={`budget-${budget.id}`} className='min-h-0' />
                      
                      {/* Budget Header */}
                      <div className='collapse-title flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 min-h-0 !pl-0 sm:!pl-0'>
                        {/* Top row on mobile: Icon, Title, Actions */}
                        <div className='flex items-center gap-3 w-full sm:w-auto sm:flex-1 sm:min-w-0'>
                          <div 
                            className={cn(
                              'flex items-center justify-center w-10 h-10 shrink-0 rounded-lg',
                              !hasColor && 'bg-secondary/10'
                            )}
                            style={hasColor ? { backgroundColor: `${budget.color}20` } : undefined}
                          >
                            <Wallet 
                              className={cn('w-5 h-5', !hasColor && 'text-secondary')} 
                              style={hasColor ? { color: budget.color } : undefined}
                            />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='font-medium text-base-content line-clamp-2'>{budget.description}</p>
                            <p className='text-xs text-base-content/50'>{expenseCount} expense{expenseCount !== 1 ? 's' : ''}</p>
                          </div>
                          {/* Actions visible only on mobile in top row */}
                          <div className='flex sm:hidden items-center gap-1'>
                            {budget.id && <EditBudget budget={budget} />}
                            {budget.id && <DeleteBudget id={budget.id} />}
                          </div>
                        </div>

                        {/* Bottom row on mobile: Values + Chevron */}
                        <div className='flex items-center justify-between sm:justify-end gap-4 pl-13 sm:pl-0'>
                          <div className='flex items-center gap-3 sm:gap-4'>
                            <div className='text-left sm:text-right'>
                              <p className='font-semibold text-base-content'>{euro(budget.value)}</p>
                              <p className={cn(
                                'text-xs font-medium',
                                budgetRemaining >= 0 ? 'text-success' : 'text-error'
                              )}>
                                {budgetRemaining >= 0 ? `${euro(budgetRemaining)} left` : `${euro(Math.abs(budgetRemaining))} over`}
                              </p>
                            </div>
                            {/* Actions visible only on desktop */}
                            <div className='hidden sm:flex items-center gap-1'>
                              {budget.id && <EditBudget budget={budget} />}
                              {budget.id && <DeleteBudget id={budget.id} />}
                            </div>
                          </div>
                          <ChevronDown className='w-5 h-5 text-base-content/40 transition-transform shrink-0' />
                        </div>
                      </div>

                      {/* Expenses Content */}
                      <div className='collapse-content p-0 bg-base-200/30'>
                        <div className='px-3 sm:px-4 pt-2'>
                          {expenseCount === 0 ? (
                            <div className='text-center py-6 text-base-content/50'>
                              <Receipt className='w-6 h-6 mx-auto mb-2 opacity-30' />
                              <p className='text-sm'>No expenses recorded</p>
                            </div>
                          ) : (
                            <MonthBudgetExpenses budgetId={budget.id || 0} expenses={budget.expenses} />
                          )}

                          {/* Add Expense Button */}
                          <div className='mt-3'>
                            <AddExpense budgetId={budget.id || 0} budgetName={budget.description} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SortableItem>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      {/* Totals - Stack on mobile, side by side on desktop */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        <div className='flex items-center justify-between p-3 sm:p-4 bg-secondary/10 rounded-xl border border-secondary/20'>
          <span className='font-medium text-secondary'>Total Budgets</span>
          <span className='text-xl font-bold text-secondary'>{euro(totalBudgets)}</span>
        </div>
      </div>
    </div>
  );
};

export default MonthBudgets;
