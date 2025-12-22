import Loading from '@/components/shared/Loading';
import MonthsWidget from '@/components/dashboard/MonthsWidget';
import { useMonths } from '@/hooks/monthHooks';
import Year from '@/components/shared/Year';
import CanNotFetchData from '@/components/shared/CanNotFetchData';
import MonthsEmpty from '@/components/dashboard/MonthsEmpty';
import AddNewMonth from '@/components/dashboard/MonthAddButton';
import DashboardSummaryCards from '@/components/dashboard/DashboardSummaryCards';
import { getTotal } from '@/helpers/currency';

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
        <DashboardSummaryCards 
          totalIncome={totalIncome}
          totalMonths={totalMonths}
        />
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
