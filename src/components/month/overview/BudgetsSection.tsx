import { Budget } from '@/types/month';
import { Wallet } from 'lucide-react';
import MonthBudgets from '../budgets/MonthBudgets';
import AddBudget from '../budgets/MonthBudgetAddButton';

type Props = {
  budgets: Budget[];
}

export default function BudgetsSection({ budgets }: Props) {
  return (
    <div className='bg-base-100 rounded-xl sm:rounded-2xl border border-base-300 shadow-sm overflow-hidden'>
      <div className='flex items-center justify-between p-3 sm:p-5 border-b border-base-200 bg-base-200/30'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/20'>
            <Wallet className='w-5 h-5 text-secondary' />
          </div>
          <div>
            <h2 className='text-lg font-semibold text-base-content'>Budgets</h2>
            <p className='text-sm text-base-content/50'>{budgets?.length || 0} categor{budgets?.length !== 1 ? 'ies' : 'y'}</p>
          </div>
        </div>
        <AddBudget />
      </div>
      <div className='p-3 sm:p-5'>
        {budgets?.length > 0 ? (
          <MonthBudgets budgets={budgets} />
        ) : (
          <div className='text-center py-8 text-base-content/50'>
            <Wallet className='w-8 h-8 mx-auto mb-2 opacity-30' />
            <p>No budgets added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

