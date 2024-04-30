import { ReactNode } from 'react';

import ClientsProvider from './ClientsProvider';
import SitesProvider from './SitesProvider';

interface AppProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ClientsProvider>
      <SitesProvider>{children}</SitesProvider>
    </ClientsProvider>
  );
};

export default AppContextProvider;
