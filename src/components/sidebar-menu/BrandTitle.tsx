import { Wallet } from 'lucide-react';

const BrandTitle = () => (
  <a 
    className='flex items-center gap-2.5 group' 
    href='/dashboard' 
    aria-label='My Finances'
  >
    <div className='flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md shadow-primary/25'>
      <Wallet className='w-5 h-5 text-white' />
    </div>
    <span className='text-lg font-bold text-base-content'>
      My Finances
    </span>
  </a>
);

export default BrandTitle;
