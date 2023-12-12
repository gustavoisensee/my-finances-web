import Plus from '../svgs/Plus';

type Props = {
  onClick: (x?: unknown) => void | unknown;
}

export function AddButton({ onClick }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='btn btn-primary btn-circle btn-xs'
    >
      <Plus />
    </button>
  )
}