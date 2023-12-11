import Plus from '../svgs/Plus';

type Props = {
  onClick: (x?: unknown) => void | unknown;
}

export function AddButton({ onClick }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='flex justify-center items-center h-6 w-6 text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'
    >
      <Plus />
    </button>
  )
}