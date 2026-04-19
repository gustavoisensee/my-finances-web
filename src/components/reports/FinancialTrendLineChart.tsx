import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { euro } from '@/helpers/currency';
import { CHART_COLORS, CHART_TOOLTIP_STYLE, LineChartDataItem } from '@/hooks/reportsHooks';

type Props = {
  data: LineChartDataItem[];
};

const formatCurrency = (value: number) => euro(value);

export default function FinancialTrendLineChart({ data }: Props) {
  return (
    <div className='rounded-2xl bg-base-100 border border-base-200 p-6 shadow-sm min-w-0'>
      <h3 className='text-lg font-semibold text-base-content mb-4'>
        Financial Trends Over Time
      </h3>
      <ResponsiveContainer width='100%' height={320}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          <Line
            type='monotone'
            dataKey='income'
            name='Income'
            stroke={CHART_COLORS.income}
            strokeWidth={2}
            dot={{ fill: CHART_COLORS.income, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type='monotone'
            dataKey='expenses'
            name='Expenses'
            stroke={CHART_COLORS.expenses}
            strokeWidth={2}
            dot={{ fill: CHART_COLORS.expenses, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type='monotone'
            dataKey='savings'
            name='Savings'
            stroke={CHART_COLORS.savings}
            strokeWidth={2}
            dot={{ fill: CHART_COLORS.savings, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

