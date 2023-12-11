import Trash from '../svgs/Trash';

type Props = {
  onClick: (x?: unknown) => void | unknown;
}

export function DeleteButton({ onClick }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='flex justify-center items-center h-6 w-6 text-sm font-semibold rounded-full border border-transparent bg-red-400 text-white hover:bg-red-500 disabled:opacity-50 disabled:pointer-events-none'
    >
      <Trash />
    </button>
  )
}