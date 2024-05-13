import { useState } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import styles from '../../styles/navBarStyles';

import clientRoutes from '../../routes/ClientRoutes';
import sitesRoutes from '../../routes/SitesRoutes';
import interventionsRoutes from '../../routes/InterventionsRoutes';
import equipmentRoutes from '../../routes/EquipmentRoutes';

import SetMenuItems from './SetMenuItems';

interface MenuItemsProps {
  isActive: (url: string) => boolean;
}

const MenuItems: React.FC<MenuItemsProps> = ({ isActive }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menuTitle: string): void => {
    if (openMenu === menuTitle) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menuTitle);
    }
  };

  const location = useLocation();

  //   const getActiveClass = (): boolean => {
  //     return isActive() ? styles.menuItemActive : styles.menuItem;
  //   };
  const getActiveClass = (url: string): string => {
    return location.pathname === url ? styles.menuItemActive : styles.menuItem;
  };

  return (
    <>
      <NavLink
        to={'/'}
        className={getActiveClass('/')}>
        Parametrage
      </NavLink>
      <SetMenuItems
        titre='Clients'
        routes={clientRoutes}
        getActiveClass={getActiveClass}
        isOpen={openMenu === 'Clients'}
        toggleMenu={() => toggleMenu('Clients')}
      />
      <SetMenuItems
        titre='Machines'
        routes={equipmentRoutes}
        getActiveClass={getActiveClass}
        isOpen={openMenu === 'Machines'}
        toggleMenu={() => toggleMenu('Machines')}
      />
      <SetMenuItems
        titre='Sites'
        routes={sitesRoutes}
        getActiveClass={getActiveClass}
        isOpen={openMenu === 'Sites'}
        toggleMenu={() => toggleMenu('Sites')}
      />
      <SetMenuItems
        titre='Interventions'
        routes={interventionsRoutes}
        getActiveClass={getActiveClass}
        isOpen={openMenu === 'Interventions'}
        toggleMenu={() => toggleMenu('Interventions')}
      />
      {/* <a
        href='#'
        className={styles.menuItem}>
        Calendar
      </a> */}
    </>
  );
};

export default MenuItems;
