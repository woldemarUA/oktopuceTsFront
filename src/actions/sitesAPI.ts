import axios from 'axios';

import SitesInterface from '../interface/sitesInterface';
// import { SitesFormValues } from '../components/forms/config/sitesFormConfig';

const BASE_PATH: string = import.meta.env.VITE_API_PATH;

export const addSite = async (siteData: SitesInterface) => {
  try {
    await axios.post(`${BASE_PATH}/sites`, siteData);

    return { msg: 'Site  était ajouté avec succès' };
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

export const fetchSites = async (): Promise<SitesInterface[]> => {
  try {
    const response = await axios.get<SitesInterface[]>(`${BASE_PATH}/sites`);
    return response.data.data;
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        `La récupération des clients a échoué avec le statut: ${err.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};
