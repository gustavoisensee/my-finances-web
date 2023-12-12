import classNames from 'classnames';

import Menu from './Menu';
import MobileMenu from './MobileMenu';

const DesktopMenu = () => (
  <div
    className={classNames(
      'hidden flex-col fixed top-0 start-0 bottom-0 w-64 ',
      'bg-white border border-gray-200 overflow-y-auto',
      'lg:flex lg:translate-x-0'
    )}
  >
    <Menu />
  </div>
)

const SideMenu = () => {
  return (
    <>
      <MobileMenu />
      <DesktopMenu />
    </>
  );
}

export default SideMenu;