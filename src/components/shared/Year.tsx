import { useYears } from '@/hooks/yearHooks';
import { Year as YearType } from '@/types/year'
import Loading from './Loading';

const Year = () => {
  const { isFetching, years, state, onChange } = useYears();

  if (isFetching) return <Loading labelEnabled={false} />;

  return years && (
    <select className='select select-bordered max-w-xs' onChange={onChange} defaultValue={state}>
      {(years as YearType[])?.map((y, i) => (
        <option key={i} value={y.value}>{y.value}</option>
      ))}
    </select>
  )
};

export default Year;
