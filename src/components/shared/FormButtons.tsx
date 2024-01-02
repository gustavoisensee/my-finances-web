type Props = {
  isSubmitting: boolean;
  handleCloseModal: () => void;
}

export default function FormButtons({ isSubmitting, handleCloseModal }: Props) {
  return (
    <div className='flex'>
      <button className='btn btn-primary' type={isSubmitting ? 'button' : 'submit'}>
        {isSubmitting && <span className='loading loading-spinner' />}
        Submit
      </button>
      <button className='btn ml-2' onClick={!isSubmitting ? handleCloseModal : undefined}>
        Close
      </button>
    </div>
  )
}
