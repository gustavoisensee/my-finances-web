import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Category() {
  const session = useSession();

  console.log({ sessionCSR: session });
  return (
    <div>
      Category page

      <Link href='/' >Index page</Link>
    </div>
  )
}
