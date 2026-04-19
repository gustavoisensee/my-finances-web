import { obsAlert } from '@/helpers/alert';
import cn from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import AlertSuccess from '../svgs/AlertSuccess';
import AlertWarning from '../svgs/AlertWarning';
import AlertError from '../svgs/AlertError';
import AlertInfo from '../svgs/AlertInfo';

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

const alertIcons = {
  warning: <AlertWarning />,
  success: <AlertSuccess />,
  error: <AlertError />,
  info: <AlertInfo />,
};

export default function Toast() {
  const [state, setState] = useState<StateProps>(initialValues);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleAlert = useCallback((props: StateProps) => {
    setState({ ...initialValues, ...props });
  }, []);

  useEffect(() => {
    obsAlert.subscribe(handleAlert);
    return () => obsAlert.unsubscribe(handleAlert);
  }, [handleAlert]);

  useEffect(() => {
    if (state.open) {
      timerRef.current = setTimeout(() => setState(initialValues), state.time);
    }
    return () => clearTimeout(timerRef.current);
  }, [state.open, state.time]);

  return (
    <div className={cn({
      'toast transition-all': true,
      'translate-x-24': !state.open
    })}>
      <div className='flex flex-wrap alert shadow-lg'>
        {alertIcons[state.type]}
        <span>{state.message}</span>
      </div>
    </div>
  )
}