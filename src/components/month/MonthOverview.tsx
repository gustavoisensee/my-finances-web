import { Month as MonthType } from '@/types/month';
import { getTotal } from '@/helpers/currency';
import { getTotals } from '@/helpers/totals';
import { useStickyCard } from '@/hooks/useStickyCard';
import { 
  MonthOverviewHeader, 
  StatsCards, 
  IncomesSection, 
  BudgetsSection 
} from './overview';

type Props = {
  month: MonthType
}

export default function MonthOverview({ month }: Props) {
  const totalIncome = getTotal(month.incomes);
  const { totalBudgets, totalExpenses } = getTotals(month.budgets);
  const budgetsLeft = totalBudgets - totalExpenses;
  const isBalanced = totalIncome === totalBudgets;
  const isOverBudget = totalBudgets > totalIncome;

  const { cardRef: remainingCardRef, spacerRef } = useStickyCard();

  return (
    <div className='flex flex-col gap-6'>
      <MonthOverviewHeader 
        month={month} 
        isBalanced={isBalanced} 
        isOverBudget={isOverBudget} 
      />

      <StatsCards
        totalIncome={totalIncome}
        totalBudgets={totalBudgets}
        budgetsLeft={budgetsLeft}
        remainingCardRef={remainingCardRef}
        spacerRef={spacerRef}
      />

      <IncomesSection incomes={month.incomes} />

      <BudgetsSection budgets={month.budgets} />
    </div>
  )
}
