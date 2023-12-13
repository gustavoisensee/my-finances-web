import { FieldErrors, UseFormRegister } from 'react-hook-form';
import cn from 'classnames';

import { InputTypes } from '@/types/form';

type Props = {
  title: string;
  keyName: 'value' | 'yearId' | 'description' | 'createdAt';
  register: UseFormRegister<InputTypes>;
  errors?: FieldErrors<InputTypes>;
}

export default function TextInput({ title, keyName, register, errors }: Props) {
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <span className='label-text'>{title}</span>
      </div>
      <input
        {...register(keyName)}
        className={cn({
          'input input-bordered w-full': true,
          'input-error': !!errors?.[keyName]
        })}
      />
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




