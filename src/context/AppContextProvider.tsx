import { ReactNode } from 'react';

import ClientsProvider from './ClientsProvider';
import SitesProvider from './SitesProvider';
import InterventionsProvider from './InterventionsProvider';
import EquipmentProvider from './EquipmentProvider';
import FormContextProvider from './FormContextProvider';

interface AppProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ClientsProvider>
      <FormContextProvider>
        <SitesProvider>
          <InterventionsProvider>
            <EquipmentProvider>{children}</EquipmentProvider>
          </InterventionsProvider>
        </SitesProvider>
      </FormContextProvider>
    </ClientsProvider>
  );
};

export default AppContextProvider;
