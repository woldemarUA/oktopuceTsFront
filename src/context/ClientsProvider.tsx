import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import ClientsInterface from '../interface/clientsInterface';

import { fetchClients } from '../actions/clientsAPI';

interface ClientsContextType {
  clients: ClientsInterface[];
  client: ClientsInterface | null;
  getClients: () => Promise<void>;
  error: Error | null;
}

const DefaultContextValue: ClientsContextType = {
  clients: [],
  client: null,
  getClients: async () => {},
  error: null,
};

interface ClientsProviderProps {
  children: ReactNode;
}

const ClientsContext = createContext<ClientsContextType>(DefaultContextValue);

const ClientsProvider: React.FC<ClientsProviderProps> = ({ children }) => {
  const [clients, setClients] = useState<ClientsInterface[]>([]);
  const [client, setClient] = useState<ClientsInterface | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const getClients = async () => {
    try {
      const clientsData = await fetchClients();
      setClients(clientsData);
      setClient(clientsData[0] || null);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err
          : new Error('Échec de la récupération des clients')
      );
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <ClientsContext.Provider value={{ clients, client, error, getClients }}>
      {children}
    </ClientsContext.Provider>
  );
};
export const useClients = () => useContext(ClientsContext);

export default ClientsProvider;
