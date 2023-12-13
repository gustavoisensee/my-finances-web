import { SelectHTMLAttributes } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import cn from 'classnames';

import { InputTypes, Option } from '@/types/form';

type Props = {
  options: Option[],
  title: string;
  keyName: 'value' | 'yearId';
  register?: UseFormRegister<InputTypes>;
  errors?: FieldErrors<InputTypes>;
} & SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ options, title, keyName, errors, register, ...rest }: Props) {
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <span className='label-text'>{title}</span>
      </div>

      <select
        {...(register ? register(keyName) : {})}
        className={cn({
          'select select-bordered w-full': true,
          'select-error': !!errors?.[keyName]
        })}
        {...rest}
      >
        {options?.map((o, i) => (
          <option key={i} value={o.value}>{o.label}</option>
        ))}
      </select>

      <div className='label'>
        {errors?.[keyName] && (
          <span className='label-text-alt text-red-500'>
            {errors?.[keyName]?.message}
          </span>
        )}
      </div>
    </label>
  )
}