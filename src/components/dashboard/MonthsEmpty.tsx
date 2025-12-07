import { CalendarPlus } from 'lucide-react';

export default function MonthsEmpty() {
  return (
    <div className='flex flex-col items-center justify-center py-16 px-4'>
      <div className='flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 mb-4'>
        <CalendarPlus className='w-8 h-8 text-slate-400' />
      </div>
      <h5 className='text-lg font-semibold text-slate-700 mb-1'>
        No months tracked yet
      </h5>
      <p className='text-sm text-slate-500 text-center max-w-sm'>
        Start tracking your finances by adding your first month using the + button above.
      </p>
    </div>
  )
}
