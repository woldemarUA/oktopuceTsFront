import axios from 'axios';

import InterventionInterface from '../interface/interventionInterface';

const BASE_PATH: string = import.meta.env.VITE_API_PATH;

export const fetchInterventions = async (): Promise<
  InterventionInterface[]
> => {
  try {
    const response = await axios.get<InterventionInterface[]>(
      `${BASE_PATH}/interventions`
    );
    return response.data.data;
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
