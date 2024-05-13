import { ReactNode } from 'react';

import ClientsProvider from './ClientsProvider';
import SitesProvider from './SitesProvider';
import InterventionsProvider from './InterventionsProvider';
import EquipmentProvider from './EquipmentProvider';

interface AppProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ClientsProvider>
      <SitesProvider>
        <InterventionsProvider>
          <EquipmentProvider>{children}</EquipmentProvider>
        </InterventionsProvider>
      </SitesProvider>
    </ClientsProvider>
  );
};

export default AppContextProvider;
