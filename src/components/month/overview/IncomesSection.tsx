import { Income } from '@/types/month';
import { TrendingUp } from 'lucide-react';
import MonthIncomes from '../incomes/MonthIncomes';
import AddIncome from '../incomes/MonthIncomeAddButton';

type Props = {
  incomes: Income[];
}

export default function IncomesSection({ incomes }: Props) {
  return (
    <div className='bg-base-100 rounded-xl sm:rounded-2xl border border-base-300 shadow-sm overflow-hidden'>
      <div className='flex items-center justify-between p-3 sm:p-5 border-b border-base-200 bg-base-200/30'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-success/20'>
            <TrendingUp className='w-5 h-5 text-success' />
          </div>
          <div>
            <h2 className='text-lg font-semibold text-base-content'>Incomes</h2>
            <p className='text-sm text-base-content/50'>{incomes?.length || 0} source{incomes?.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <AddIncome />
      </div>
      <div className='p-3 sm:p-5'>
        {incomes?.length > 0 ? (
          <MonthIncomes incomes={incomes} />
        ) : (
          <div className='text-center py-8 text-base-content/50'>
            <TrendingUp className='w-8 h-8 mx-auto mb-2 opacity-30' />
            <p>No incomes added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

