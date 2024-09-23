import axios from 'axios';

import InterventionInterface from '../interface/interventionInterface';
// import { string } from 'yup';

const BASE_PATH: string = import.meta.env.VITE_API_PATH + 'interventions';
const INT_TYPES_PATH: string =
  import.meta.env.VITE_API_PATH + 'intervention_types';

// const INTERVENTIONS_API_PATH = import.meta.env.VITE_API_INTERVENTIONS_PATH;

export const fetchInterventions = async (): Promise<
  InterventionInterface[]
> => {
  try {
    const response = await axios.get<InterventionInterface[]>(
      BASE_PATH // `${BASE_PATH}/interventions`
    );

    return response.data;
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        `La récupération des interventions a échoué avec le statut: ${err.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};

export const addIntervention = async (
  interventionData: Record<string, any>
) => {
  try {
    await axios.post(BASE_PATH, interventionData);
    return { msg: 'Intervention etait ajoutée avec success' };
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        `Ajouter le site a échoué avec le statut: ${err.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};

export const fetchInterventionTypes = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(INT_TYPES_PATH);
    return response.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Ajouter le site a échoué avec le statut: ${error.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};
