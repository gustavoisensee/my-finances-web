import Loading from '@/components/shared/Loading';
import MonthsWidget from '@/components/dashboard/MonthsWidget';
import { useMonths } from '@/hooks/monthHooks';
import Year from '@/components/shared/Year';
import CanNotFetchData from '@/components/shared/CanNotFetchData';
import MonthsEmpty from '@/components/dashboard/MonthsEmpty';
import AddNewMonth from '@/components/dashboard/MonthAddButton';
import { euro, getTotal } from '@/helpers/currency';
import { TrendingUp, Wallet, Calendar } from 'lucide-react';

export default function DashboardPage() {
  const { data, isFetching, error } = useMonths();

  // Calculate totals for summary cards
  const totalIncome = data?.reduce((acc, month) => acc + getTotal(month.incomes), 0) || 0;
  const totalMonths = data?.length || 0;

  return (
    <div className='flex flex-1 flex-col gap-6'>
      {/* Header Section */}
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold text-base-content'>
          Dashboard
        </h1>
        <p className='text-base-content/50'>
          Track your monthly finances at a glance
        </p>
      </div>

      {/* Summary Cards */}
      {!isFetching && data && data.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
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

          {/* Tracked Months Card */}
          <div className='group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 p-5 text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-xl hover:shadow-violet-500/30'>
            <div className='absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl' />
            <div className='relative'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='rounded-xl bg-white/20 p-2.5 backdrop-blur-sm'>
                  <Calendar className='h-5 w-5' />
                </div>
                <span className='text-sm font-medium text-violet-100'>Tracked Months</span>
              </div>
              <p className='text-3xl font-bold tracking-tight'>{totalMonths}</p>
              <p className='mt-1 text-sm text-violet-100'>Active entries</p>
            </div>
          </div>

          {/* Average Income Card */}
          <div className='group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-5 text-white shadow-lg shadow-amber-500/20 transition-all hover:shadow-xl hover:shadow-amber-500/30 sm:col-span-2 lg:col-span-1'>
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
      )}

      {/* Months Section */}
      <div className='flex flex-col gap-5'>
        {/* Controls */}
        <div className='flex items-center pt-5 border-t border-base-300'>
          <Year />
          <AddNewMonth />
        </div>

        {/* Month Cards */}
        {isFetching && <Loading />}
        {!isFetching && error && <CanNotFetchData />}
        {!isFetching && data && <MonthsWidget data={data} />}
        {!isFetching && data?.length === 0 && <MonthsEmpty />}
      </div>
    </div>
  )
}
