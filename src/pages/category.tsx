import Link from 'next/link';
import { useCategories } from '../hooks/categoryHooks';

export default function Category() {
  const { data, isLoading, error } = useCategories();

  return (
    <div>
      <h2>Category page</h2>
      <div>
        <Link href='/' >Index page</Link>
      </div>

      <div>
        {isLoading && <span>Loading...</span>}
        {/* @ts-ignore */}
        {!isLoading && data && data.data.map((d, i) => <div key={i}><span>{d.name}</span></div>)}
        {!isLoading && error && <span>Sorry but we could not get the data. try again!</span>}
      </div>
    </div>
  )
}
