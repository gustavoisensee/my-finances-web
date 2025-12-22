import { TrendingUp, Wallet } from 'lucide-react';
import { euro } from '@/helpers/currency';

type Props = {
  totalIncome: number;
  totalMonths: number;
};

export default function DashboardSummaryCards({ totalIncome, totalMonths }: Props) {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {/* Total Income Card */}
      <div className='group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30'>
        <div className='absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl' />
        <div className='relative'>
          <div className='flex items-center gap-3 mb-3'>
            <div className='rounded-xl bg-white/20 p-2.5 backdrop-blur-sm'>
              <TrendingUp className='h-5 w-5' />
            </div>
            <span className='text-sm font-medium text-emerald-100'>Total Income</span>
          </div>
          <p className='text-3xl font-bold tracking-tight'>{euro(totalIncome)}</p>
          <p className='mt-1 text-sm text-emerald-100'>This year</p>
        </div>
      </div>

      {/* Average Income Card */}
      <div className='group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-5 text-white shadow-lg shadow-amber-500/20 transition-all hover:shadow-xl hover:shadow-amber-500/30'>
        <div className='absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl' />
        <div className='relative'>
          <div className='flex items-center gap-3 mb-3'>
            <div className='rounded-xl bg-white/20 p-2.5 backdrop-blur-sm'>
              <Wallet className='h-5 w-5' />
            </div>
            <span className='text-sm font-medium text-amber-100'>Avg. Income</span>
          </div>
          <p className='text-3xl font-bold tracking-tight'>
            {euro(totalMonths > 0 ? totalIncome / totalMonths : 0)}
          </p>
          <p className='mt-1 text-sm text-amber-100'>Per month</p>
        </div>
      </div>
    </div>
  );
}

