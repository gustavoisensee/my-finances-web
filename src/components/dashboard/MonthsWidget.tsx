import { Month } from '@/types/month';
import MonthWidget from '../dashboard/MonthWidget';

type Props = {
  data: Month[]
}

const MonthsWidget = ({ data }: Props) => (
  <div className='flex flex-row bg-white rounded-lg flex-wrap'>
    {data?.map((d, i) => (
      <MonthWidget key={i} month={d} />
    ))}
  </div>
);

export default MonthsWidget;