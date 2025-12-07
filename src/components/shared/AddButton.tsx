import cn from 'classnames';
import { Plus } from 'lucide-react';

type Props = {
  onClick: (x?: unknown) => void | unknown;
  className?: string;
  label?: string;
}

export function AddButton({ onClick, className, label }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl',
        'bg-primary text-primary-content',
        'shadow-lg shadow-primary/25',
        'hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
        label ? 'px-4 h-11' : 'w-11 h-11',
        className
      )}
    >
      <Plus className='w-5 h-5' strokeWidth={2.5} />
      {label && <span className='font-semibold text-sm'>{label}</span>}
    </button>
  )
}
