import { useYears } from '@/hooks/yearHooks';
import { Year } from '@/types/year'
import Loading from './Loading';

const Year = () => {
  const { isFetching, years, state, onChange } = useYears();

  if (isFetching) return <Loading labelEnabled={false} />;

  return years && (
    <div className='hs-dropdown '>
      <button id='hs-dropdown-default' type='button' className='hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none'>
        {state}
        <svg className='hs-dropdown-open:rotate-180 w-4 h-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='m6 9 6 6 6-6' /></svg>
      </button>

      <div className='hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full' aria-labelledby='hs-dropdown-default'>
        {(years as Year[])?.map((y, i) => (
          <span
            key={i}
            className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 cursor-pointer'
            onClick={() => onChange(y.value)}
          >
            {y.value}
          </span>
        ))}
      </div>
    </div>
  )
};

export default Year;
