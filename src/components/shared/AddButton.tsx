import cn from 'classnames';
import Plus from '../svgs/Plus';

type Props = {
  onClick: (x?: unknown) => void | unknown;
  className?: string;
}

export function AddButton({ onClick, className = 'btn-sm' }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        className,
        'btn btn-primary btn-circle'
      )}
    >
      <Plus />
    </button>
  )
}