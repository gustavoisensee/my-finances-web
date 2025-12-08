import { euro, getTotal } from '@/helpers/currency';
import { Income } from '@/types/month';
import { Banknote } from 'lucide-react';
import EditButton from './MonthIncomeEditButton';
import DeleteButton from './MonthIncomeDeleteButton';

type Props = {
  incomes: Income[]
}

const MonthIncomes = ({ incomes }: Props) => {
  const total = getTotal(incomes);

  return (
    <div className='flex flex-col gap-4'>
      {/* Income List */}
      <div className='divide-y divide-base-200 border border-base-300 rounded-xl overflow-hidden'>
        {incomes?.map?.((income, i) => (
          <div 
            key={i} 
            className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-base-100 hover:bg-base-200/50 transition-colors'
          >
            {/* Top row on mobile: Icon, Description, Actions */}
            <div className='flex items-center gap-3 w-full sm:w-auto sm:flex-1 sm:min-w-0'>
              <div className='flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-success/10'>
                <Banknote className='w-5 h-5 text-success' />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='font-medium text-base-content truncate'>{income.description}</p>
              </div>
              {/* Actions on mobile - in top row */}
              <div className='flex sm:hidden items-center gap-1'>
                {income.id && <EditButton income={income} />}
                {income.id && <DeleteButton id={income.id} />}
              </div>
            </div>
            
            {/* Bottom row on mobile: Value */}
            <div className='flex items-center justify-between sm:justify-end gap-4 pl-13 sm:pl-0'>
              <div className='text-left sm:text-right'>
                <p className='font-semibold text-base-content text-lg sm:text-base'>{euro(income.value)}</p>
              </div>
              {/* Actions on desktop */}
              <div className='hidden sm:flex items-center gap-1'>
                {income.id && <EditButton income={income} />}
                {income.id && <DeleteButton id={income.id} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className='flex items-center justify-between p-3 sm:p-4 bg-success/10 rounded-xl border border-success/20'>
        <span className='font-medium text-success'>Total Incomes</span>
        <span className='text-xl font-bold text-success'>{euro(total)}</span>
      </div>
    </div>
  );
};

export default MonthIncomes;
