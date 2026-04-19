import { obsAlert } from '@/helpers/alert';
import cn from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export type StateProps = {
  open: boolean;
  type: 'warning' | 'success' | 'error' | 'info',
  message: string;
  time?: number;
}

const initialValues: StateProps = {
  open: false,
  type: 'info',
  message: '',
  time: 5000
};

const alertConfig = {
  success: {
    icon: CheckCircle,
    bg: 'bg-success/10 border-success/30',
    iconColor: 'text-success',
  },
  error: {
    icon: XCircle,
    bg: 'bg-error/10 border-error/30',
    iconColor: 'text-error',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-warning/10 border-warning/30',
    iconColor: 'text-warning',
  },
  info: {
    icon: Info,
    bg: 'bg-info/10 border-info/30',
    iconColor: 'text-info',
  },
};

export default function Toast() {
  const [state, setState] = useState<StateProps>(initialValues);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const close = useCallback(() => setState(initialValues), []);

  const handleAlert = useCallback((props: StateProps) => {
    setState({ ...initialValues, ...props });
  }, []);

  useEffect(() => {
    obsAlert.subscribe(handleAlert);
    return () => obsAlert.unsubscribe(handleAlert);
  }, [handleAlert]);

  useEffect(() => {
    if (state.open) {
      timerRef.current = setTimeout(close, state.time);
    }
    return () => clearTimeout(timerRef.current);
  }, [state.open, state.time, close]);

  const config = alertConfig[state.type];
  const Icon = config.icon;

  return (
    <div className={cn(
      'toast toast-end z-50 transition-all duration-300 ease-in-out',
      state.open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
    )}>
      <div className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg min-w-[280px] max-w-[400px]',
        config.bg
      )}>
        <Icon className={cn('w-5 h-5 shrink-0', config.iconColor)} />
        <span className='flex-1 text-sm text-base-content'>{state.message}</span>
        <button
          onClick={close}
          className='btn btn-ghost btn-xs btn-circle shrink-0'
        >
          <X className='w-3.5 h-3.5' />
        </button>
      </div>
    </div>
  )
}
