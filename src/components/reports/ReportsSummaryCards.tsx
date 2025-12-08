import { TrendingDown, PiggyBank, Target } from 'lucide-react';
import { euro } from '@/helpers/currency';

type Props = {
  totalExpenses: number;
  netSavings: number;
  totalBudgets: number;
};

export default function ReportsSummaryCards({ totalExpenses, netSavings, totalBudgets }: Props) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {/* Total Expenses Card */}
      <div className='group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 p-5 text-white shadow-lg shadow-rose-500/20 transition-all hover:shadow-xl hover:shadow-rose-500/30'>
        <div className='absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl' />
        <div className='relative'>
          <div className='flex items-center gap-3 mb-3'>
            <div className='rounded-xl bg-white/20 p-2.5 backdrop-blur-sm'>
              <TrendingDown className='h-5 w-5' />
            </div>
            <span className='text-sm font-medium text-rose-100'>Total Expenses</span>
          </div>
          <p className='text-3xl font-bold tracking-tight'>{euro(totalExpenses)}</p>
          <p className='mt-1 text-sm text-rose-100'>This year</p>
        </div>
      </div>

      {/* Net Savings Card */}
      <div className='group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 p-5 text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-xl hover:shadow-violet-500/30'>
        <div className='absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl' />
        <div className='relative'>
          <div className='flex items-center gap-3 mb-3'>
            <div className='rounded-xl bg-white/20 p-2.5 backdrop-blur-sm'>
              <PiggyBank className='h-5 w-5' />
            </div>
            <span className='text-sm font-medium text-violet-100'>Net Savings</span>
          </div>
          <p className='text-3xl font-bold tracking-tight'>{euro(netSavings)}</p>
          <p className='mt-1 text-sm text-violet-100'>Income - Expenses</p>
        </div>
      </div>

      {/* Budget Count Card */}
      <div className='group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 p-5 text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/30 sm:col-span-2 lg:col-span-1'>
        <div className='absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl' />
        <div className='relative'>
          <div className='flex items-center gap-3 mb-3'>
            <div className='rounded-xl bg-white/20 p-2.5 backdrop-blur-sm'>
              <Target className='h-5 w-5' />
            </div>
            <span className='text-sm font-medium text-cyan-100'>Total Budgets</span>
          </div>
          <p className='text-3xl font-bold tracking-tight'>{totalBudgets}</p>
          <p className='mt-1 text-sm text-cyan-100'>Tracked categories</p>
        </div>
      </div>
    </div>
  );
}

