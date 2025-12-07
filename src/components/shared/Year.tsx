import { ChevronDown } from 'lucide-react';
import cn from 'classnames';
import { useYears } from '@/hooks/yearHooks';
import { Year as YearType } from '@/types/year'
import Loading from './Loading';

const Year = () => {
  const { isFetching, years, state, onChange } = useYears();

  if (isFetching) return <Loading labelEnabled={false} fullScreen={false} size="sm" />;

  return years && (
    <div className='relative inline-flex'>
      <select 
        className={cn(
          'appearance-none cursor-pointer',
          'pl-4 pr-10 h-11',
          'bg-base-100 border border-base-300 rounded-xl',
          'text-base-content font-semibold text-base',
          'shadow-sm',
          'hover:border-base-content/30 hover:shadow',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          'transition-all duration-200'
        )}
        onChange={onChange} 
        defaultValue={state}
      >
        {(years as YearType[])?.map((y, i) => (
          <option key={i} value={y.value}>{y.value}</option>
        ))}
      </select>
      <ChevronDown 
        className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50 pointer-events-none' 
      />
    </div>
  )
};

export default Year;
