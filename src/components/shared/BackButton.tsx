import { useNavigate } from 'react-router-dom';

type Props = {
  label?: string;
}

export default function BackButton({ label = 'Go back' }: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      type='button'
      className='link link-primary'
    >
      {label}
    </button>
  )
}
