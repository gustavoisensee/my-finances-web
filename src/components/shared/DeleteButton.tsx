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
        'flex z-10 justify-center items-center h-8 w-8',
        'text-sm font-semibold rounded-lg',
        'text-slate-400 hover:text-red-500 hover:bg-red-50',
        'transition-colors duration-200',
        'disabled:opacity-50 disabled:pointer-events-none'
      )}
    >
      <Trash2 className='w-4 h-4' />
    </button>
  )
}
