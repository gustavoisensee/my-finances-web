import { useRouter } from 'next/router';

type Props = {
  label?: string;
}

export default function BackButton({ label = 'Go back' }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={router.back}
      type='button'
      className='link link-primary'
    >
      {label}
    </button>
  )
}
