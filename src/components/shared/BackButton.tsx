import { useRouter } from 'next/router';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={router.back}
      type='button'
      className='btn mb-8'
    >
      Go back
    </button>
  )
}
