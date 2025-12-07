import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import cn from 'classnames';

type Props = {
  label?: string;
}

export default function BackButton({ label = 'Go back' }: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      type='button'
      className={cn(
        'inline-flex items-center gap-2 text-sm font-medium',
        'text-slate-600 hover:text-primary',
        'transition-colors duration-200'
      )}
    >
      <ArrowLeft className='w-4 h-4' />
      {label}
    </button>
  )
}
