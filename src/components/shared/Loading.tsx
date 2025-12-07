import { Loader2 } from 'lucide-react';
import cn from 'classnames';

type Props = {
  labelEnabled?: boolean;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Loading({ 
  labelEnabled = true, 
  fullScreen = true,
  size = 'md' 
}: Props) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const content = (
    <div className='flex flex-col items-center gap-4'>
      {/* Animated loader */}
      <div className='relative'>
        {/* Outer glow */}
        <div className='absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse' />
        
        {/* Spinner container */}
        <div className={cn(
          'relative flex items-center justify-center',
          'rounded-full bg-gradient-to-br from-white to-slate-50',
          'shadow-lg shadow-primary/10',
          size === 'sm' ? 'w-12 h-12' : size === 'md' ? 'w-16 h-16' : 'w-20 h-20'
        )}>
          <Loader2 className={cn(
            'animate-spin text-primary',
            sizeClasses[size]
          )} />
        </div>
      </div>

      {/* Label */}
      {labelEnabled && (
        <div className='flex flex-col items-center gap-1'>
          <span className='text-sm font-medium text-slate-700'>Loading</span>
          <span className='text-xs text-slate-400'>Please wait...</span>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className='flex flex-1 items-center justify-center min-h-[200px]'>
        {content}
      </div>
    );
  }

  return content;
}
