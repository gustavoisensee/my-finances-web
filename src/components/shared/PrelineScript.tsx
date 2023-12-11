import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    import('preline/preline');
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      if (window.HSStaticMethods) HSStaticMethods.autoInit();
    }, 110);
  }, [path]);

  return null;
}