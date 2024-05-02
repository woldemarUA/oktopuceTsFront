import { useState } from 'react';

import MenuItems from '../components/menuComps/MenuItems';

import styles from '../styles/navBarStyles';
import LogoSVG from '../assets/logo/logo.svg';

interface MenuItemsProps {
  isActive: (url: string) => boolean;
}

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const isActive: MenuItemsProps['isActive'] = (url) =>
    location.pathname === url;

  return (
    <nav className={styles.navContainer}>
      <div className={styles.flexContainer}>
        <div className={styles.mobileMenuContainer}>
          {/* Mobile menu button */}
          <button
            className={styles.mobileMenuButton}
            aria-controls='mobile-menu'
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className='sr-only'>Open main menu</span>
            <svg
              className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
            <svg
              className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <div className={styles.centerFlex}>
          <div className={styles.logoContainer}>
            <img
              src={LogoSVG}
              alt='Logo'
              className={styles.logo}
            />
            <span className={styles.logoHeadline}>OKTOPUCE</span>
          </div>
          <div className={styles.navLinks}>
            <div className={styles.navLink}>
              <MenuItems isActive={isActive} />
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          className='sm:hidden'
          id='mobile-menu'>
          <div className='space-y-1 px-2 pb-3 pt-2'>
            <MenuItems isActive={isActive} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
