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
import { CHART_COLORS, BarChartDataItem } from '@/hooks/reportsHooks';

type Props = {
  data: BarChartDataItem[];
};

export default function IncomeExpensesBarChart({ data }: Props) {
  const formatCurrency = (value: number) => euro(value);

  return (
    <div className='rounded-2xl bg-base-100 border border-base-200 p-6 shadow-sm'>
      <h3 className='text-lg font-semibold text-base-content mb-4'>
        Income vs Expenses by Month
      </h3>
      <div className='h-80'>
        <ResponsiveContainer width='100%' height='100%'>
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
              contentStyle={{
                backgroundColor: 'oklch(var(--b1))',
                border: '1px solid oklch(var(--b3))',
                borderRadius: '0.75rem',
              }}
              labelStyle={{ color: 'oklch(var(--bc))' }}
              itemStyle={{ color: 'oklch(var(--bc))' }}
            />
            <Legend />
            <Bar dataKey='income' name='Income' fill={CHART_COLORS.income} radius={[4, 4, 0, 0]} />
            <Bar dataKey='expenses' name='Expenses' fill={CHART_COLORS.expenses} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

