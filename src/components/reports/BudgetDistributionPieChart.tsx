import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { euro } from '@/helpers/currency';
import { CHART_COLORS, CHART_TOOLTIP_STYLE, PieChartDataItem } from '@/hooks/reportsHooks';

type Props = {
  data: PieChartDataItem[];
};

const formatCurrency = (value: number) => euro(value);

export default function BudgetDistributionPieChart({ data }: Props) {
  return (
    <div className='rounded-2xl bg-base-100 border border-base-200 p-6 shadow-sm xl:col-span-2 min-w-0'>
      <h3 className='text-lg font-semibold text-base-content mb-4'>
        Expenses by Category
      </h3>
      {data.length > 0 ? (
        <ResponsiveContainer width='100%' height={320}>
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
              {data.map((entry, index) => (
                <Cell
                  key={`${entry.name}-${index}`}
                  fill={CHART_COLORS.budget[index % CHART_COLORS.budget.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              {...CHART_TOOLTIP_STYLE}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className='h-80 flex items-center justify-center text-base-content/50'>
          No category data available
        </div>
      )}
    </div>
  );
}

