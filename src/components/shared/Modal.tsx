import { type ReactNode } from 'react';
import cn from 'classnames';

import Divider from '../shared/Divider';

type Props = {
  openModal: boolean;
  title: string;
  children: ReactNode
}

export default function Modal({ openModal, title, children }: Props) {
  return (
    <dialog className={cn(
      'modal',
      {
        'modal-open': openModal
      })}>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>{title}</h3>
        <Divider className='-ml-6 -mr-6' />
        {openModal && (
          children
        )}
      </div>
    </dialog>
  )
}




