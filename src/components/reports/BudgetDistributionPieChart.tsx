import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { euro } from '@/helpers/currency';
import { CHART_COLORS, PieChartDataItem } from '@/hooks/reportsHooks';

type Props = {
  data: PieChartDataItem[];
};

export default function BudgetDistributionPieChart({ data }: Props) {
  const formatCurrency = (value: number) => euro(value);

  return (
    <div className='rounded-2xl bg-base-100 border border-base-200 p-6 shadow-sm xl:col-span-2'>
      <h3 className='text-lg font-semibold text-base-content mb-4'>
        Expenses by Category
      </h3>
      {data.length > 0 ? (
        <div className='h-80'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                outerRadius={120}
                fill='#8884d8'
                dataKey='value'
                stroke='none'
              >
                {data.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CHART_COLORS.budget[index % CHART_COLORS.budget.length]} 
                  />
                ))}
              </Pie>
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
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className='h-80 flex items-center justify-center text-base-content/50'>
          No category data available
        </div>
      )}
    </div>
  );
}

