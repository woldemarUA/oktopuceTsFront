import axios from 'axios';

export interface Option {
  value: number;
  label: string;
}

import { EquipmentInterface } from '../interface/equipment_interface';

export interface GasTypeInterface extends Option {
  potentiel: string;
}

const BASE_PATH: string = import.meta.env.VITE_API_PATH + 'equipment';
const LOCATIONS_API: string = import.meta.env.VITE_API_PATH + 'locations';
const GAS_TYPES_API: string = import.meta.env.VITE_API_PATH + 'gas_types';
const BRANDS_API: string = import.meta.env.VITE_API_PATH + 'equipment_brands';
const INT_TYPES_API: string = import.meta.env.VITE_API_PATH + 'int_types';
const EXT_TYPES_API: string = import.meta.env.VITE_API_PATH + 'ext_types';
const NFC_API: string = import.meta.env.VITE_API_PATH + 'nfc_tags';

export const addEquipment = async (equipmentData: Record<string, any>) => {
  try {
    await axios.post(BASE_PATH, equipmentData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return { msg: 'Machine  etait ajoutée avec success' };
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Ajouter de la machine a échoué avec le statut: ${error.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};

export const fetchEquipments = async (): Promise<EquipmentInterface[]> => {
  try {
    const response = await axios.get<EquipmentInterface[]>(`${BASE_PATH}`);

    return response.data;
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        `La récupération des equipment locations a échoué avec le statut: ${err.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};

export const fetchEquipmentLocations = async (): Promise<Option[]> => {
  try {
    const response = await axios.get<Option[]>(LOCATIONS_API);

    return response.data;
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        `La récupération des equipment locations a échoué avec le statut: ${err.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};

export const fetchEqBrands = async (): Promise<Option[]> => {
  try {
    const response = await axios.get<Option[]>(`${BRANDS_API}`);
    const brands = response.data;

    return brands;
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        `La récupération des equipment brands a échoué avec le statut: ${err.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};

export const fetchgasTypes = async (): Promise<GasTypeInterface[]> => {
  try {
    const response = await axios.get<GasTypeInterface[]>(`${GAS_TYPES_API}`);

    const gasTypes = response.data;

    return gasTypes;
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        `La récupération des equipment gasTypes a échoué avec le statut: ${err.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};

export const fetchIntTypes = async (): Promise<Option[]> => {
  try {
    const response = await axios.get<Option[]>(`${INT_TYPES_API}`);

    return response.data;
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        `La récupération des equipment int types a échoué avec le statut: ${err.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};

export const fetchExtTypes = async (): Promise<Option[]> => {
  try {
    const response = await axios.get<Option[]>(`${EXT_TYPES_API}`);

    return response.data;
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        `La récupération des equipment ext types a échoué avec le statut: ${err.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};

export const fetchNfcs = async (): Promise<Option[]> => {
  try {
    const response = await axios.get<Option[]>(`${NFC_API}`);
    const nfcs = response.data;

    return nfcs;
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        `La récupération des nfcs a échoué avec le statut: ${err.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};
