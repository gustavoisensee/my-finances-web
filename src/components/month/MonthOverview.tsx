import { Month as MonthType, Months } from '@/types/month';
import { euro, getTotal } from '@/helpers/currency';
import { getTotals } from '@/helpers/totals';
import { Calendar, TrendingUp, Wallet, PiggyBank, CheckCircle2, AlertTriangle } from 'lucide-react';
import cn from 'classnames';
import MonthBudgets from './budgets/MonthBudgets';
import MonthIncomes from './incomes/MonthIncomes';
import AddBudget from './budgets/MonthBudgetAddButton';
import AddIncome from './incomes/MonthIncomeAddButton';

type Props = {
  month: MonthType
}

export default function MonthOverview({ month }: Props) {
  const totalIncome = getTotal(month.incomes);
  const { totalBudgets, totalExpenses } = getTotals(month.budgets);
  const budgetsLeft = totalBudgets - totalExpenses;
  const isBalanced = totalIncome === totalBudgets;
  const isOverBudget = totalBudgets > totalIncome;

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <div className='flex items-center gap-3 mb-2'>
            <div className='flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10'>
              <Calendar className='w-6 h-6 text-primary' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-base-content'>
                {Months[month.value]}
              </h1>
              {month.description && (
                <p className='text-base-content/50 text-sm'>{month.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-xl border',
          isBalanced 
            ? 'bg-success/10 text-success border-success/30' 
            : isOverBudget
              ? 'bg-error/10 text-error border-error/30'
              : 'bg-warning/10 text-warning border-warning/30'
        )}>
          {isBalanced ? (
            <>
              <CheckCircle2 className='w-5 h-5' />
              <span className='font-medium'>Budget Balanced</span>
            </>
          ) : isOverBudget ? (
            <>
              <AlertTriangle className='w-5 h-5' />
              <span className='font-medium'>Over Budget</span>
            </>
          ) : (
            <>
              <AlertTriangle className='w-5 h-5' />
              <span className='font-medium'>Unassigned Income</span>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {/* Total Income */}
        <div className='flex items-center gap-4 p-5 bg-success/10 rounded-2xl border border-success/20 shadow-sm'>
          <div className='flex items-center justify-center w-12 h-12 rounded-xl bg-success/20'>
            <TrendingUp className='w-6 h-6 text-success' />
          </div>
          <div>
            <p className='text-sm text-base-content/50'>Total Income</p>
            <p className='text-2xl font-bold text-base-content'>{euro(totalIncome)}</p>
          </div>
        </div>

        {/* Total Budget */}
        <div className='flex items-center gap-4 p-5 bg-info/10 rounded-2xl border border-info/20 shadow-sm'>
          <div className='flex items-center justify-center w-12 h-12 rounded-xl bg-info/20'>
            <Wallet className='w-6 h-6 text-info' />
          </div>
          <div>
            <p className='text-sm text-base-content/50'>Total Budget</p>
            <p className='text-2xl font-bold text-base-content'>{euro(totalBudgets)}</p>
          </div>
        </div>

        {/* Budget Remaining */}
        <div className='flex items-center gap-4 p-5 bg-base-100 rounded-2xl border border-base-300 shadow-sm'>
          <div className={cn(
            'flex items-center justify-center w-12 h-12 rounded-xl',
            budgetsLeft >= 0 ? 'bg-warning/20' : 'bg-error/20'
          )}>
            <PiggyBank className={cn(
              'w-6 h-6',
              budgetsLeft >= 0 ? 'text-warning' : 'text-error'
            )} />
          </div>
          <div>
            <p className='text-sm text-base-content/50'>Remaining</p>
            <p className={cn(
              'text-2xl font-bold',
              budgetsLeft >= 0 ? 'text-base-content' : 'text-error'
            )}>{euro(budgetsLeft)}</p>
          </div>
        </div>
      </div>

      {/* Incomes Section */}
      <div className='bg-base-100 rounded-xl sm:rounded-2xl border border-base-300 shadow-sm overflow-hidden'>
        <div className='flex items-center justify-between p-3 sm:p-5 border-b border-base-200 bg-base-200/30'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-success/20'>
              <TrendingUp className='w-5 h-5 text-success' />
            </div>
            <div>
              <h2 className='text-lg font-semibold text-base-content'>Incomes</h2>
              <p className='text-sm text-base-content/50'>{month.incomes?.length || 0} source{month.incomes?.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <AddIncome />
        </div>
        <div className='p-3 sm:p-5'>
          {month?.incomes?.length > 0 ? (
            <MonthIncomes incomes={month.incomes} />
          ) : (
            <div className='text-center py-8 text-base-content/50'>
              <TrendingUp className='w-8 h-8 mx-auto mb-2 opacity-30' />
              <p>No incomes added yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Budgets Section */}
      <div className='bg-base-100 rounded-xl sm:rounded-2xl border border-base-300 shadow-sm overflow-hidden'>
        <div className='flex items-center justify-between p-3 sm:p-5 border-b border-base-200 bg-base-200/30'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/20'>
              <Wallet className='w-5 h-5 text-secondary' />
            </div>
            <div>
              <h2 className='text-lg font-semibold text-base-content'>Budgets</h2>
              <p className='text-sm text-base-content/50'>{month.budgets?.length || 0} categor{month.budgets?.length !== 1 ? 'ies' : 'y'}</p>
            </div>
          </div>
          <AddBudget />
        </div>
        <div className='p-3 sm:p-5'>
          {month?.budgets?.length > 0 ? (
            <MonthBudgets budgets={month.budgets} />
          ) : (
            <div className='text-center py-8 text-base-content/50'>
              <Wallet className='w-8 h-8 mx-auto mb-2 opacity-30' />
              <p>No budgets added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
