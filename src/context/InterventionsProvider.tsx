import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { fetchInterventions } from '../actions/interventionsAPI';

import InterventionInterface from '../interface/interventionInterface';

interface InterventionsContextType {
  interventions: InterventionInterface[];
  intervention: InterventionInterface | null;
  getIntervetions: () => Promise<void>;
  error: Error | null;
}

const DefaultContextValue: InterventionsContextType = {
  interventions: [],
  intervention: null,
  getIntervetions: async () => {},
  error: null,
};

interface InterventionsProviderProps {
  children: ReactNode;
}

const InterventionsContext =
  createContext<InterventionsContextType>(DefaultContextValue);

const InterventionsProvider: React.FC<InterventionsProviderProps> = ({
  children,
}) => {
  const [interventions, setInterventions] = useState<InterventionInterface[]>(
    []
  );
  const [intervention, setIntervention] =
    useState<InterventionInterface | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [fetchFlag, setFetchFlag] = useState(false);

  const getIntervetions = async () => {
    try {
      const interventionsData = await fetchInterventions();
      setInterventions(interventionsData);

      setIntervention(interventionsData[0] || null);
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
    getIntervetions();
  }, [fetchFlag]);

  return (
    <InterventionsContext.Provider
      value={{ interventions, intervention, error, getIntervetions }}>
      {children}
    </InterventionsContext.Provider>
  );
};

export const useInterventions = () => useContext(InterventionsContext);

export default InterventionsProvider;
