import Pencil from './svgs/Pencil';

type Props = {
  onClick: (x?: unknown) => void | unknown;
}

export function EditButton({ onClick }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='flex justify-center items-center h-6 w-6 mx-1 text-sm font-semibold rounded-full border border-transparent bg-yellow-400 text-white hover:bg-yellow-500 disabled:opacity-50 disabled:pointer-events-none'
    >
      <Pencil />
    </button>
  )
}