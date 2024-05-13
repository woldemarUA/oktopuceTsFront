import axios from 'axios';

import EquipmentInterface from '../interface/equipmentInterface';

interface EquipmentBrand {
  id: number;
  name: string;
  created_at: null | string;
  updated_at: null | string;
}

interface EquipmentBrandsResponse {
  data: EquipmentBrand[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

interface EquipmentLocationsInterface {
  id: number;
  name: string;
}

const BASE_PATH = import.meta.env.VITE_API_EQUIPMENTS_PATH;

const LAVAREL_PATH = import.meta.env.VITE_API_PATH;

export const fetchEquipmentLocations = async (): Promise<
  EquipmentLocationsInterface[]
> => {
  try {
    const response = await axios.get<EquipmentLocationsInterface[]>(
      `${BASE_PATH}/equipment_locations.json`
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

export const fetchEqBrands = async (): Promise<EquipmentBrand[]> => {
  try {
    let allBrands: EquipmentBrand[] = [];
    let nextPageUrl = `${LAVAREL_PATH}/equipment-brands`;
    while (nextPageUrl) {
      const response = await axios.get<EquipmentBrandsResponse[]>(nextPageUrl);
      allBrands = allBrands.concat(response.data.data);
      nextPageUrl = response.data.links.next || null;
    }

    return allBrands;
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
