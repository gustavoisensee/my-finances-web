import Loading from '@/components/shared/Loading';
import Year from '@/components/shared/Year';
import CanNotFetchData from '@/components/shared/CanNotFetchData';
import ReportsSummaryCards from '@/components/reports/ReportsSummaryCards';
import IncomeExpensesBarChart from '@/components/reports/IncomeExpensesBarChart';
import FinancialTrendLineChart from '@/components/reports/FinancialTrendLineChart';
import BudgetDistributionPieChart from '@/components/reports/BudgetDistributionPieChart';
import ReportsEmpty from '@/components/reports/ReportsEmpty';
import { useReports } from '@/hooks/reportsHooks';

export default function ReportsPage() {
  const {
    isFetching,
    error,
    hasData,
    isEmpty,
    totalExpenses,
    netSavings,
    totalBudgets,
    barChartData,
    lineChartData,
    pieChartData,
  } = useReports();

  return (
    <div className='flex flex-1 flex-col gap-6'>
      {/* Header Section */}
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold text-base-content'>
          Reports
        </h1>
        <p className='text-base-content/50'>
          Visual insights into your financial data
        </p>
      </div>

      {/* Year Selector */}
      <div className='flex items-center pt-5 border-t border-base-300'>
        <Year />
      </div>

      {/* Loading & Error States */}
      {isFetching && <Loading />}
      {!isFetching && error && <CanNotFetchData />}

      {/* Content */}
      {hasData && (
        <>
          <ReportsSummaryCards
            totalExpenses={totalExpenses}
            netSavings={netSavings}
            totalBudgets={totalBudgets}
          />

          {/* Charts Section */}
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
            <IncomeExpensesBarChart data={barChartData} />
            <FinancialTrendLineChart data={lineChartData} />
            <BudgetDistributionPieChart data={pieChartData} />
          </div>
        </>
      )}

      {/* Empty State */}
      {isEmpty && <ReportsEmpty />}
    </div>
  );
}
