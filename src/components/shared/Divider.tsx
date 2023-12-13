import cn from 'classnames';

type Props = {
  className: string;
}

export default function Divider({ className }: Props) {
  return (
    <div className={cn('h-px bg-gray-200 my-6', className)} />
  )
}
