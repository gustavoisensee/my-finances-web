import { USER_ADMIN } from '@/constants';
import { Category } from '@/types/category';

const isAdmin = (id: number) => id === USER_ADMIN;

type Props = {
  data: Category[]
}

const AdminBadge = () => (
  <span className='inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>Admin</span>
);

const YouBadge = () => (
  <span className='inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-100 text-teal-800'>You</span>

)

const CategoryTable = ({ data }: Props) => (
  <div className='flex flex-col bg-white p-3 rounded-lg'>
    <div className='-m-1.5 overflow-x-auto'>
      <div className='p-1.5 min-w-full inline-block align-middle'>
        <div className='overflow-hidden'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead>
              <tr>
                <th scope='col' className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase'>Name</th>
                <th scope='col' className='px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase'>Owner</th>
                <th scope='col' className='px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {data?.map((d, i) => (
                <tr key={i}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{d.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>{isAdmin(d.userId) ? <AdminBadge /> : <YouBadge />}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-end text-sm font-medium'>
                    {!isAdmin(d.userId) &&
                      <button
                        type='button'
                        className='inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none'
                        onClick={() => alert('Work in progress')}
                      >Delete</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default CategoryTable;