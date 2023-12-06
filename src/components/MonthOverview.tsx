import { Month as MonthType, Months } from '@/types/month';

type Props = {
  month: MonthType
}

export default function MonthOverview({ month }: Props) {
  return (
    <>
      <div className='bg-white rounded-xl p-4'>
        <h3 className='text-2xl dark:text-white mb-4'>
          {/* @ts-ignore */}
          Month of {Months[month.value]}
        </h3>
        <div>
          Notes: {month.notes}
        </div>
      </div>


      <div className='bg-white rounded-xl p-4 mt-4'>
        <h3 className='text-2xl dark:text-white mb-4'>
          Incomes
        </h3>
        <div>
          {month.incomes?.map?.((b, i) => (
            <div key={i}>
              {b.value}
            </div>
          ))}
        </div>
      </div>

      <div className='bg-white rounded-xl p-4 mt-4'>
        <h3 className='text-2xl dark:text-white mb-4'>
          Budgets
        </h3>
        <div>
          {month.budgets?.map?.((b, i) => (
            <div key={i}>
              {b.name}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
