import axios from 'axios';

import InterventionInterface from '../interface/interventionInterface';

// const BASE_PATH: string = import.meta.env.VITE_API_PATH;

const INTERVENTIONS_API_PATH = import.meta.env.VITE_API_INTERVENTIONS_PATH;

export const fetchInterventions = async (): Promise<
  InterventionInterface[]
> => {
  try {
    const response = await axios.get<InterventionInterface[]>(
      INTERVENTIONS_API_PATH // `${BASE_PATH}/interventions`
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
