type Props = {
  labelEnabled?: boolean;
}

export default function Loading({ labelEnabled = true }: Props) {
  return (
    <div className='flex items-center'>
      <div className='animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-blue-600 rounded-full' role='status' aria-label='loading'>
        <span className='sr-only'>Loading...</span>
      </div>
      {labelEnabled && <span className='pl-2'>Loading</span>}
    </div>
  )
}