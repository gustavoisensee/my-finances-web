import cn from 'classnames';
import { X } from 'lucide-react';

const COLORS = [
  '#EF4444', // red
  '#F97316', // orange
  '#F59E0B', // amber
  '#84CC16', // lime
  '#22C55E', // green
  '#14B8A6', // teal
  '#06B6D4', // cyan
  '#3B82F6', // blue
  '#6366F1', // indigo
  '#8B5CF6', // violet
  '#A855F7', // purple
  '#EC4899', // pink
  '#64748B', // slate
  '#78716C', // stone
];

type Props = {
  value?: string;
  onChange: (color: string | undefined) => void;
  title?: string;
};

export default function ColorPicker({ value, onChange, title = 'Color' }: Props) {
  return (
    <div className='flex flex-col gap-2 mb-4'>
      <label className='text-sm font-medium text-base-content/70'>{title}</label>
      <div className='flex flex-wrap gap-2'>
        {/* Clear color option */}
        <button
          type='button'
          onClick={() => onChange(undefined)}
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all',
            !value
              ? 'border-primary ring-2 ring-primary/30'
              : 'border-base-300 hover:border-base-content/30'
          )}
          title='No color'
        >
          <X className='w-4 h-4 text-base-content/50' />
        </button>

        {/* Color swatches */}
        {COLORS.map((color) => (
          <button
            key={color}
            type='button'
            onClick={() => onChange(color)}
            className={cn(
              'w-8 h-8 rounded-full transition-all',
              value === color
                ? 'ring-2 ring-offset-2 ring-offset-base-100 scale-110'
                : 'hover:scale-110'
            )}
            style={{
              backgroundColor: color,
              boxShadow: value === color ? `0 0 0 2px ${color}` : undefined,
            }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}

