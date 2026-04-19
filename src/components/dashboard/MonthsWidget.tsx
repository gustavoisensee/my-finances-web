import { Month } from '@/types/month';
import MonthWidget from '../dashboard/MonthWidget';

type Props = {
  data: Month[]
}

const MonthsWidget = ({ data }: Props) => (
  <div className='flex flex-row flex-wrap -m-2'>
    {data?.map?.((d) => (
      <MonthWidget key={d.id} month={d} />
    ))}
  </div>
);

export default MonthsWidget;
