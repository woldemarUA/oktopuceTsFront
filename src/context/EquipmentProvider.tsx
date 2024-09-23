import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { EquipmentInterface } from '../interface/equipment_interface';

import { Option, GasTypeInterface } from '../actions/equipmentsAPI';

//  API Calls
import {
  fetchEquipmentLocations,
  fetchEqBrands,
  fetchgasTypes,
  fetchEquipments,
  fetchExtTypes,
  fetchIntTypes,
  addEquipment,
  fetchNfcs,
} from '../actions/equipmentsAPI';

interface EquipmentContextTypes {
  equipments: EquipmentInterface[];
  equipment: EquipmentInterface | null;
  equipmentBrands: Option[];
  equipmentLocations: Option[];
  gas_types: GasTypeInterface[];
  nfcList: Option[];
  int_types: Option[];
  ext_types: Option[];
  error: Error | null;
  handleAddEquipment: (
    equipmentData: EquipmentInterface
  ) => Promise<{ msg: string }>;
}

const DefaultContextValue: EquipmentContextTypes = {
  equipments: [],
  equipment: null,
  equipmentBrands: [],
  equipmentLocations: [],
  gas_types: [],
  int_types: [],
  ext_types: [],
  error: null,
  nfcList: [],
  handleAddEquipment: async () => {
    return {
      msg: 'message',
    };
  },
};

interface EquipmentProviderProps {
  children: ReactNode;
}

const EquipmentContext =
  createContext<EquipmentContextTypes>(DefaultContextValue);

const EquipmentProvider = ({ children }: EquipmentProviderProps) => {
  // to change

  const [gas_types, setGasTypes] = useState<GasTypeInterface[]>([]);
  const [int_types, setIntTypes] = useState<Option[]>([]);
  const [ext_types, setExtTypes] = useState<Option[]>([]);
  // fin to change
  const [equipments, setEquipments] = useState<EquipmentInterface[]>([]);
  const [equipment, setEquipment] = useState<EquipmentInterface | null>(null);
  const [equipmentBrands, setEquipmentBrands] = useState<Option[]>([]);
  const [equipmentLocations, setEquipmentLocations] = useState<Option[]>([]);

  const [nfcList, setNfcList] = useState<Option[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [fetchFlag, setFetchFlag] = useState(false);

  const handleAddEquipment = async (
    equipmentData: EquipmentInterface
  ): Promise<{ msg: string }> => {
    try {
      const equipmentPayload = {
        ...equipmentData,
        site: `/api/sites/${equipmentData.site}`,
        equipment_type: `/api/equipment_types/${equipmentData.equipment_type_id}`,
        nfc_tag: `/api/nfc_tags/${equipmentData.nfc_tag}`,
        gas_weight: parseInt(equipmentData.gas_weight || '0', 10),
        equipment_brand: `/api/equipment_brands/${equipmentData.equipment_brand_id}`,
      };

      const serverResp = await addEquipment(equipmentPayload);
      setFetchFlag(true);

      return serverResp;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getNfcs = async () => {
    try {
      const nfcs = await fetchNfcs();

      setNfcList(nfcs);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err
          : new Error('Échec de la récupération des gast typse')
      );
    } finally {
      setFetchFlag(false);
    }
  };

  const getEquipments = async () => {
    try {
      const equipments = await fetchEquipments();

      setEquipments(equipments);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err
          : new Error('Échec de la récupération des gast typse')
      );
    } finally {
      setFetchFlag(false);
    }
  };

  const getGasTypes = async () => {
    try {
      const gas_types = await fetchgasTypes();
      setGasTypes(gas_types);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err
          : new Error('Échec de la récupération des gast typse')
      );
    } finally {
      setFetchFlag(false);
    }
  };

  const getIntTypes = async () => {
    try {
      const res = await fetchIntTypes();
      setIntTypes(res);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err
          : new Error('Échec de la récupération des int types')
      );
    } finally {
      setFetchFlag(false);
    }
  };

  const getExtTypes = async () => {
    try {
      const res = await fetchExtTypes();
      setExtTypes(res);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err
          : new Error('Échec de la récupération des int typse')
      );
    } finally {
      setFetchFlag(false);
    }
  };

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
    getGasTypes();
    getExtTypes();
    getIntTypes();
    getNfcs();
  }, [fetchFlag]);

  useEffect(() => {
    getEquipments();
  }, [fetchFlag]);

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
        int_types,
        ext_types,
        error,
        nfcList,
        handleAddEquipment,
      }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipments = () => useContext(EquipmentContext);
export default EquipmentProvider;
