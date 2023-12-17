import { obsAlert } from '@/helpers/alert';
import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';
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

export default function Toast() {
  const [state, setState] = useState<StateProps>(initialValues);
  const alertTypes = useMemo(() => ({
    warning: <AlertWarning />,
    success: <AlertSuccess />,
    error: <AlertError />,
    info: <AlertInfo />
  }), []);
  const iconType = useMemo(() => alertTypes[state.type], [alertTypes, state.type]);

  useEffect(() => {
    const fn = (props: StateProps) => setState({ ...state, ...props });
    obsAlert.subscribe(fn);

    return () => obsAlert.unsubscribe(fn);
  }, [state]);

  useEffect(() => {
    if (state.open) {
      setTimeout(() => setState(initialValues), state.time);
    }
  }, [state.open, state.time]);

  return (
    <div className={cn({
      'toast transition-all': true,
      'translate-x-24': !state.open
    })}>
      <div className='flex flex-wrap alert shadow-lg'>
        {iconType}
        <span className=''>
          {state.message}
        </span>
      </div>
    </div>
  )
}