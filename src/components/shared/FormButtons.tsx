type Props = {
  isSubmitting: boolean;
  onClickClose: () => void;
}

export default function FormButtons({ isSubmitting, onClickClose }: Props) {
  return (
    <div className='flex'>
      <button className='btn btn-primary' type={isSubmitting ? 'button' : 'submit'}>
        {isSubmitting && <span className='loading loading-spinner' />}
        Submit
      </button>
      <button className='btn ml-2' onClick={!isSubmitting ? onClickClose : undefined}>
        Close
      </button>
    </div>
  )
}
