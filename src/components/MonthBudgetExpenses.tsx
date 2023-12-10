import { euro } from '@/helpers/currency';
import { Expense } from '@/types/month';

type Props = {
  expenses: Expense[]
}

const MonthBudgetExpenses = ({ expenses }: Props) => (
  <>
    {expenses.map((e, i) => (
      <div key={i} className='flex'>
        <div>{e.description} </div>
        <div>&nbsp;|&nbsp;</div>
        <div> {euro(e.value)}</div>
      </div>
    ))}
  </>
);

export default MonthBudgetExpenses;
