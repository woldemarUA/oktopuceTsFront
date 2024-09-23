import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import ClientsInterface, { ClientType } from '../interface/clientsInterface';
import { ClientFormValues } from '../interface/clientsInterface';

import {
  fetchClients,
  addClient,
  fetchClientTypes,
} from '../actions/clientsAPI';

interface ClientsContextType {
  clients: ClientsInterface[];
  client: ClientsInterface | null;
  clientTypes: ClientType[];
  getClients: () => Promise<void>;
  handleAddClient: (clientData: ClientFormValues) => Promise<{ msg: string }>;
  error: Error | null;
}

const DefaultContextValue: ClientsContextType = {
  clients: [],
  client: null,
  clientTypes: [],
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
  const [clientTypes, setClientTypes] = useState<ClientType[]>([]);
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

  const getClientTypes = async () => {
    try {
      const data = await fetchClientTypes();
      setClientTypes(data);
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error
          ? error
          : new Error('Échec de la récupération des clients')
      );
    }
  };

  useEffect(() => {
    getClients();
    getClientTypes();
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
        clientTypes,
        getClients,
        handleAddClient,
      }}>
      {children}
    </ClientsContext.Provider>
  );
};
export const useClients = () => useContext(ClientsContext);

export default ClientsProvider;
