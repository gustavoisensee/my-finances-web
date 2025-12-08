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
import { CHART_COLORS, LineChartDataItem } from '@/hooks/reportsHooks';

type Props = {
  data: LineChartDataItem[];
};

export default function FinancialTrendLineChart({ data }: Props) {
  const formatCurrency = (value: number) => euro(value);

  return (
    <div className='rounded-2xl bg-base-100 border border-base-200 p-6 shadow-sm'>
      <h3 className='text-lg font-semibold text-base-content mb-4'>
        Financial Trends Over Time
      </h3>
      <div className='h-80'>
        <ResponsiveContainer width='100%' height='100%'>
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
              contentStyle={{
                backgroundColor: 'oklch(var(--b1))',
                border: '1px solid oklch(var(--b3))',
                borderRadius: '0.75rem',
              }}
              labelStyle={{ color: 'oklch(var(--bc))' }}
              itemStyle={{ color: 'oklch(var(--bc))' }}
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
    </div>
  );
}

