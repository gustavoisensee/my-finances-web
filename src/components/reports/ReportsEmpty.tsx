import { Target } from 'lucide-react';

export default function ReportsEmpty() {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center'>
      <div className='rounded-full bg-base-200 p-4 mb-4'>
        <Target className='h-8 w-8 text-base-content/50' />
      </div>
      <h3 className='text-lg font-semibold text-base-content mb-2'>
        No data available
      </h3>
      <p className='text-base-content/50 max-w-md'>
        Start by adding months and tracking your income and expenses to see your financial reports here.
      </p>
    </div>
  );
}

