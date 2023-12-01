type Props = {
  labelEnabled?: boolean;
}

export default function Loading({ labelEnabled = true }: Props) {
  return (
    <div className='flex items-center'>
      {labelEnabled && <span className='pr-2'>Loading</span>}
      <div className='animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500' role='status' aria-label='loading'>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}