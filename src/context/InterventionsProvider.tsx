import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import {
  fetchInterventions,
  addIntervention,
} from '../actions/interventionsAPI';
import { getSiteById } from '../actions/sitesAPI';

import InterventionInterface, {
  InterventionsFormProps,
} from '../interface/interventionInterface';

interface InterventionsContextType {
  interventions: InterventionInterface[];
  intervention: InterventionInterface | null;
  getIntervetions: () => Promise<void>;
  handleAddIntervention: (
    interventionData: InterventionInterface
  ) => Promise<{ msg: string }>;
  error: Error | null;
}

const DefaultContextValue: InterventionsContextType = {
  interventions: [],
  intervention: null,
  getIntervetions: async () => {},
  handleAddIntervention: async () => {
    return {
      msg: 'message',
    };
  },
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

      // for (const intervention of interventionsData) {
      //   console.log(intervention);
      //   // const site = await getSiteById(intervention.site_id);
      //   // intervention.site_name = site.name;
      // }

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

  const handleAddIntervention = async (
    interventionData: InterventionsFormProps
  ): Promise<{ msg: string }> => {
    try {
      // interventionData.answers = {interventionData.is_unit_installed, }
      const {
        is_electrical_connections_done,
        is_functionality_tested,
        is_network_leakage_tested,
        is_refrigerant_connections_done,
        is_unit_installed,
      } = interventionData;
      const answers = {
        is_electrical_connections_done,
        is_functionality_tested,
        is_network_leakage_tested,
        is_refrigerant_connections_done,
        is_unit_installed,
      };
      const intervention = { ...interventionData, answers };

      const serverResp = await addIntervention(intervention);
      // company name, data; all numbers (site_id, )intervention_type_id

      setFetchFlag(true);
      // return { msg: 'ajoute' };
      return serverResp;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    getIntervetions();
  }, [fetchFlag]);

  return (
    <InterventionsContext.Provider
      value={{
        interventions,
        intervention,
        error,
        getIntervetions,
        handleAddIntervention,
      }}>
      {children}
    </InterventionsContext.Provider>
  );
};

export const useInterventions = () => useContext(InterventionsContext);

export default InterventionsProvider;
