import { Trash2 } from 'lucide-react';
import cn from 'classnames';

type Props = {
  onClick: (x?: unknown) => void | unknown;
}

export default function DeleteButton({ onClick }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'flex z-10 justify-center items-center',
        'h-6 w-7 sm:h-8 sm:w-8', // Larger touch target on mobile
        'text-sm font-semibold rounded-lg',
        'text-slate-400 hover:text-red-500 hover:bg-red-500/10',
        'active:bg-red-500/20', // Visual feedback on tap
        'transition-colors duration-200',
        'disabled:opacity-50 disabled:pointer-events-none'
      )}
    >
      <Trash2 className='w-5 h-5 sm:w-4 sm:h-4' />
    </button>
  )
}
