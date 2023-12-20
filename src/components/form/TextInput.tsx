import React, { forwardRef } from 'react';
import cn from 'classnames';

type Props = {
  title: string;
  error: string;
} & React.HTMLProps<HTMLInputElement>;

export default forwardRef<HTMLInputElement, Props>(
  function TextInput({ title, error, ...props }, ref) {
    return (
      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text'>{title}</span>
        </div>
        <input
          ref={ref}
          {...props}
          className={cn(
            'input input-bordered w-full',
            {
              'input-error': error
            })}
        />
        <div className='label'>
          {error && (
            <span className='label-text-alt text-red-500'>
              {error}
            </span>
          )}
        </div>
      </label>
    );
  }
);
