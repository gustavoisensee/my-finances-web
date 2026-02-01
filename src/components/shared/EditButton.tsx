import { Pencil } from 'lucide-react';
import cn from 'classnames';

type Props = {
  onClick: (x?: unknown) => void | unknown;
  disabled?: boolean;
}

export default function EditButton({ onClick, disabled }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex z-10 justify-center items-center',
        'h-6 w-7 sm:h-8 sm:w-8', // Larger touch target on mobile
        'text-sm font-semibold rounded-lg',
        'text-slate-400 hover:text-primary hover:bg-primary/10',
        'active:bg-primary/20', // Visual feedback on tap
        'transition-colors duration-200',
        'disabled:opacity-50 disabled:pointer-events-none'
      )}
    >
      <Pencil className='w-5 h-5 sm:w-4 sm:h-4' />
    </button>
  )
}
