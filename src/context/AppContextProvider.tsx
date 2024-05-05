import { ReactNode } from 'react';

import ClientsProvider from './ClientsProvider';
import SitesProvider from './SitesProvider';
import InterventionsProvider from './InterventionsProvider';

interface AppProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ClientsProvider>
      <SitesProvider>
        <InterventionsProvider>{children}</InterventionsProvider>
      </SitesProvider>
    </ClientsProvider>
  );
};

export default AppContextProvider;
