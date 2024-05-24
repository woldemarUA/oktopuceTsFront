import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import ClientsInterface from '../interface/clientsInterface';
import { ClientFormValues } from '../interface/clientsInterface';

import { fetchClients, addClient } from '../actions/clientsAPI';

interface ClientsContextType {
  clients: ClientsInterface[];
  client: ClientsInterface | null;
  getClients: () => Promise<void>;
  handleAddClient: (clientData: ClientFormValues) => Promise<{ msg: string }>;
  error: Error | null;
}

const DefaultContextValue: ClientsContextType = {
  clients: [],
  client: null,
  getClients: async () => {},
  handleAddClient: async () => {
    return {
      msg: 'message',
    };
  },
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

  const [fetchFlag, setFetchFlag] = useState(false);
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
    } finally {
      setFetchFlag(false);
    }
  };

  useEffect(() => {
    getClients();
  }, [fetchFlag]);

  const handleAddClient = async (
    clientData: ClientFormValues
  ): Promise<{ msg: string }> => {
    try {
      const serverResp = await addClient(clientData);
      setFetchFlag(true);
      return serverResp;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <ClientsContext.Provider
      value={{
        clients,
        client,
        error,
        getClients,
        handleAddClient,
      }}>
      {children}
    </ClientsContext.Provider>
  );
};
export const useClients = () => useContext(ClientsContext);

export default ClientsProvider;
