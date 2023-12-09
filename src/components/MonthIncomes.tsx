import { euro, getTotal } from '@/helpers/currency';
import { Income } from '@/types/month';

type Props = {
  incomes: Income[]
}

const MonthIncomes = ({ incomes }: Props) => {
  return (
    <>
      {incomes?.map?.((a, i) => (
        <div key={i} className='mb-2 p-2 border rounded-lg'>
          {euro(a.value)}
        </div>
      ))}
      <div className='mb-2 p-2 border rounded-lg bg-green-50 w-fit'>
        {euro(getTotal(incomes))}
      </div>
    </>
  );
};

export default MonthIncomes;