import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import SitesInterface from '../interface/sitesInterface';

import { fetchSites } from '../actions/sitesAPI';
import { error } from 'console';

interface SitesContextType {
  sites: SitesInterface[];
  site: SitesInterface | null;
  getSites: () => Promise<void>;
  error: Error | null;
}

const DefaultContextValue: SitesContextType = {
  sites: [],
  site: null,
  getSites: async () => {},
  error: null,
};

interface SitesProviderProps {
  children: ReactNode;
}

const SitesContext = createContext<SitesContextType>(DefaultContextValue);

const SitesProvider: React.FC<SitesProviderProps> = ({ children }) => {
  const [sites, setSites] = useState<SitesInterface[]>([]);
  const [site, setSite] = useState<SitesInterface | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const getSites = async () => {
    try {
      const sitesData = await fetchSites();
      setSites(sitesData);
      setSite(sitesData[0]);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err
          : new Error('Échec de la récupération des sites')
      );
    }
  };

  useEffect(() => {
    getSites();
  }, []);
  return (
    <SitesContext.Provider value={{ sites, site, getSites, error }}>
      {children}
    </SitesContext.Provider>
  );
};

export const useSites = () => useContext(SitesContext);

export default SitesProvider;
