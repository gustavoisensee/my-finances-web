import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { euro } from '@/helpers/currency';
import { CHART_COLORS, CHART_TOOLTIP_STYLE, BarChartDataItem } from '@/hooks/reportsHooks';

type Props = {
  data: BarChartDataItem[];
};

const formatCurrency = (value: number) => euro(value);

export default function IncomeExpensesBarChart({ data }: Props) {
  return (
    <div className='rounded-2xl bg-base-100 border border-base-200 p-6 shadow-sm min-w-0'>
      <h3 className='text-lg font-semibold text-base-content mb-4'>
        Income vs Expenses by Month
      </h3>
      <ResponsiveContainer width='100%' height={320}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' className='stroke-base-300' />
          <XAxis
            dataKey='name'
            tick={{ fontSize: 12 }}
            className='fill-base-content/70'
          />
          <YAxis
            tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
            tick={{ fontSize: 12 }}
            className='fill-base-content/70'
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            {...CHART_TOOLTIP_STYLE}
          />
          <Legend />
          <Bar dataKey='income' name='Income' fill={CHART_COLORS.income} radius={[4, 4, 0, 0]} />
          <Bar dataKey='expenses' name='Expenses' fill={CHART_COLORS.expenses} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

