import Link from 'next/link';

export default function Index() {
  return (
    <div>
      <h2>
        Index page
      </h2>

      <div>
        <Link href='/category'>Category page</Link>
      </div>
    </div>
  )
}
