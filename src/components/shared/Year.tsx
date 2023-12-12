import { useYears } from '@/hooks/yearHooks';
import { Year } from '@/types/year'
import Loading from './Loading';

const Year = () => {
  const { isFetching, years, state, onChange } = useYears();

  if (isFetching) return <Loading labelEnabled={false} />;

  return years && (
    <select className='select select-bordered max-w-xs' onChange={onChange} defaultValue={state}>
      {(years as Year[])?.map((y, i) => (
        <option key={i} value={y.value}>{y.value}</option>
      ))}
    </select>
  )
};

export default Year;
