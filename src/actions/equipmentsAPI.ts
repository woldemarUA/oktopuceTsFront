import axios from 'axios';

export interface Option {
  value: number;
  label: string;
}

export interface GasTypeInterface extends Option {
  potentiel: string;
}

const BASE_PATH: string = import.meta.env.VITE_API_PATH;

export const fetchEquipmentLocations = async (): Promise<Option[]> => {
  try {
    const response = await axios.get<Option[]>(
      `${BASE_PATH}equipments/locations`
    );
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
    const response = await axios.get<Option[]>(`${BASE_PATH}equipments/brands`);
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
    const response = await axios.get<GasTypeInterface[]>(
      `${BASE_PATH}equipments/gas-types`
    );
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
