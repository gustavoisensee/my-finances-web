import { useMemo } from 'react';
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
  const totalIncome = useMemo(() => getTotal(month.incomes), [month.incomes]);
  const { totalBudgets, totalExpenses } = useMemo(() => getTotals(month.budgets), [month.budgets]);
  const budgetsLeft = totalBudgets - totalExpenses;
  const isBalanced = totalIncome === totalBudgets;
  const isOverBudget = totalBudgets > totalIncome;

  const { cardRef: remainingCardRef, placeholderRef, isSticky } = useStickyCard();

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
        placeholderRef={placeholderRef}
        isSticky={isSticky}
      />

      <IncomesSection incomes={month.incomes} />

      <BudgetsSection budgets={month.budgets} />
    </div>
  )
}
