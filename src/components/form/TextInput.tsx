import { Inputs, useAddNewMonth } from '@/hooks/dashboardHooks';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  title: string;
  keyName: 'firstName' | 'lastName';
  required?: boolean;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
}

export default function TextInput({ title, keyName, required, register, errors }: Props) {
  return (
    <label className='form-control w-full max-w-xs'>
      <div className='label'>
        <span className='label-text'>{title}</span>
      </div>
      <input {...register(keyName, { required })} className='input input-bordered w-full max-w-xs' />
      <div className='label'>
        {errors?.[keyName] && <span className='label-text-alt'>It is required</span>}
      </div>
    </label>
  )
}




