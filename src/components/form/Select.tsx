import { forwardRef } from 'react';
import cn from 'classnames';

import { Option } from '@/types/form';

type Props = {
  options: Option[],
  title: string;
  error: string;
} & React.HTMLProps<HTMLSelectElement>;

export default forwardRef<HTMLSelectElement, Props>(
  function Select({ options, title, error, ...props }, ref) {
    return (
      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text'>{title}</span>
        </div>

        <select
          {...props}
          ref={ref}
          className={cn(
            'select select-bordered w-full',
            {
              'select-error': !!error
            })}
        >
          {options?.map((o, i) => (
            <option key={i} value={o.value}>{o.label}</option>
          ))}
        </select>

        <div className='label'>
          {error && (
            <span className='label-text-alt text-red-500'>
              {error}
            </span>
          )}
        </div>
      </label>
    )
  }
);