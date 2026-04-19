import cn from 'classnames';

type Props = {
  className: string;
}

export default function Divider({ className }: Props) {
  return (
    <div className={cn('h-px bg-base-content/10 my-6', className)} />
  )
}
