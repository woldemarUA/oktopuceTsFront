import Route from '../../interface/routes';
import { NavLink } from 'react-router-dom';

import styles from '../../styles/navBarStyles';

interface SetMenuItemsProps {
  titre: string;
  routes: Route[];
  getActiveClass: (url: string) => string;
  isOpen: boolean;
  toggleMenu: () => void;
}

const SetMenuItems: React.FC<SetMenuItemsProps> = ({
  titre,
  routes,
  getActiveClass,
  isOpen,
  toggleMenu,
}) => {
  return (
    <div className='relative'>
      <button
        className={getActiveClass('/')}
        onClick={toggleMenu}>
        {titre}
        {/* <svg
          className='ml-2 h-5 w-5'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'>
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg> */}
      </button>

      <div className={styles.hangingMenu}>
        {isOpen &&
          routes.map((route) => {
            return (
              <div
                key={route.path}
                className='py-1'>
                <NavLink
                  to={route.path}
                  className={styles.menuItem}
                  onClick={() => toggleMenu()}
                  tabIndex={-1}>
                  {route.linkText}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SetMenuItems;
