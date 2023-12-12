import { useRouter } from 'next/router';
import styles from '@/styles/buttons.module.css';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={router.back}
      type='button'
      className='btn btn-tertiary mb-4'
    >
      Go back
    </button>
  )
}
