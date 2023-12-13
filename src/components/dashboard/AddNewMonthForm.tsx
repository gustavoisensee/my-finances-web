import { useMemo } from 'react';
import { useAddNewMonthForm } from '@/hooks/dashboardHooks';
import TextInput from '../form/TextInput';
import Select from '../form/Select';
import { useYears } from '@/hooks/yearHooks';
import { Months } from '@/types/month';
import Divider from '../shared/Divider';

type Props = {
  onClickClose: () => void;
}

export default function AddNewMonthForm({ onClickClose }: Props) {
  const {
    register, handleSubmit, onSubmit, errors
  } = useAddNewMonthForm();
  const { isFetching, years } = useYears();
  const yearOptions = useMemo(() =>
    years.map((y) => ({ value: y.id, label: y.value })), [years]);
  const months = useMemo(() =>
    Object.keys(Months).map(key => ({ value: key, label: Months[key] })), []) ;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <Select title='Month' keyName='value' register={register} errors={errors}
        options={months} />
      <Select title='Year' keyName='yearId' register={register} errors={errors}
        options={yearOptions} disabled={isFetching} />
      <TextInput title='Description' keyName='description' register={register} />

      <Divider className='-ml-6 -mr-6' />

      <div className='flex'>
        <button className='btn btn-primary' type='submit'>Submit</button>
        <button className='btn ml-2' onClick={onClickClose}>Close</button>
      </div>
    </form>
  )
}
