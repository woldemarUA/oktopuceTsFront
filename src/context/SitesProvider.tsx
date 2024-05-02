import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import SitesInterface from '../interface/sitesInterface';

import { SitesFormValues } from '../components/forms/config/sitesFormConfig';

import { fetchSites, addSite } from '../actions/sitesAPI';

interface SitesContextType {
  sites: SitesInterface[];
  site: SitesInterface | null;
  getSites: () => Promise<void>;
  handleAddSite: (clientData: SitesFormValues) => Promise<{ msg: string }>;
  error: Error | null;
}

const DefaultContextValue: SitesContextType = {
  sites: [],
  site: null,
  getSites: async () => {},
  handleAddSite: async () => {
    return {
      msg: 'message',
    };
  },
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
  const [fetchFlag, setFetchFlag] = useState(false);

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
    } finally {
      setFetchFlag(false);
    }
  };

  const handleAddSite = async (
    siteData: SitesFormValues
  ): Promise<{ msg: string }> => {
    try {
      const serverResp = await addSite(siteData);
      setFetchFlag(true);
      return serverResp;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    getSites();
  }, [fetchFlag]);
  return (
    <SitesContext.Provider
      value={{ sites, site, getSites, handleAddSite, error }}>
      {children}
    </SitesContext.Provider>
  );
};

export const useSites = () => useContext(SitesContext);

export default SitesProvider;
