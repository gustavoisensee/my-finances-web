import MenuIcon from '../svgs/Menu';
import BrandTitle from './BrandTitle';
import Menu from './Menu';

const MobileMenu = () => (
  <>
    {/* Side Menu */}
    <div className='drawer lg:hidden'>
      <input id='my-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-side z-50'>
        <label htmlFor='my-drawer' aria-label='close sidebar' className='drawer-overlay'></label>
        <div className='flex w-64 h-full'>
          <Menu />
        </div>
      </div>
    </div>

    {/* Navbar */}
    <div className='navbar bg-base-100 fixed top-0 left-0 right-0 z-40 lg:hidden'>
      <div className='flex-none'>
        <label className='btn btn-square btn-ghost' htmlFor='my-drawer'>
          <MenuIcon />
        </label>
      </div>
      <div className='flex-1'>
        <BrandTitle />
      </div>
    </div>
  </>
)

export default MobileMenu;