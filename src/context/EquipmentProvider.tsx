import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { EquipmentInterface } from '../interface/equipment_interface';

import {
  //EquipmentInterface,
  EquipmentLocationsInterface,
  EquipmentBrandsInterface,
} from '../interface/equipmentInterface';

//  API Calls
import {
  fetchEquipmentLocations,
  fetchEqBrands,
} from '../actions/equipmentsAPI';

interface GasTypeInterface {
  id: number;
  name: string;
  global_warming_potential: number;
}

interface EquipmentContextTypes {
  equipments: EquipmentInterface[];
  equipment: EquipmentInterface | null;
  equipmentBrands: EquipmentBrandsInterface[];
  equipmentLocations: EquipmentLocationsInterface[];
  gas_types: GasTypeInterface[];
  error: Error | null;
}

const DefaultContextValue: EquipmentContextTypes = {
  equipments: [],
  equipment: null,
  equipmentBrands: [],
  equipmentLocations: [],
  gas_types: [],
  error: null,
};

interface EquipmentProviderProps {
  children: ReactNode;
}

const EquipmentContext =
  createContext<EquipmentContextTypes>(DefaultContextValue);

const gas_types_api = [
  { id: 1, name: 'R-134A', global_warming_potential: 1430 },
  { id: 2, name: 'R-22', global_warming_potential: 1810 },
  { id: 3, name: 'R-407C', global_warming_potential: 1800 },
  { id: 4, name: 'R-410A', global_warming_potential: 2100 },
  { id: 5, name: 'R-32', global_warming_potential: 675 },
];

const EquipmentProvider = ({ children }: EquipmentProviderProps) => {
  // to change

  const [gas_types, setGasTypes] = useState<GasTypeInterface[]>(gas_types_api);
  // fin to change
  const [equipments, setEquipments] = useState<EquipmentInterface[]>([]);
  const [equipment, setEquipment] = useState<EquipmentInterface | null>(null);
  const [equipmentBrands, setEquipmentBrands] = useState<
    EquipmentBrandsInterface[]
  >([]);
  const [equipmentLocations, setEquipmentLocations] = useState<
    EquipmentLocationsInterface[]
  >([]);
  const [error, setError] = useState<Error | null>(null);
  const [fetchFlag, setFetchFlag] = useState(false);

  const getEquipmentLocations = async () => {
    try {
      const eqLocationsData = await fetchEquipmentLocations();
      setEquipmentLocations(eqLocationsData);
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

  const getEqBrands = async () => {
    try {
      const eqBrandsData = await fetchEqBrands();
      setEquipmentBrands(eqBrandsData);
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
    getEqBrands();
  }, [fetchFlag]);

  useEffect(() => {
    getEquipmentLocations();
  }, [fetchFlag]);

  return (
    <EquipmentContext.Provider
      value={{
        equipments,
        equipment,
        equipmentBrands,
        equipmentLocations,
        gas_types,
        error,
      }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipments = () => useContext(EquipmentContext);
export default EquipmentProvider;
