import axios from 'axios';
import ClientsInterface from '../interface/clientsInterface';

import { ClientFormValues } from '../interface/clientsInterface';

const BASE_PATH: string = import.meta.env.VITE_API_PATH;

// const FORM_CONF_PATH: string = import.meta.env.VITE_API_FORM_CONFIG;

export const addClient = async (userInfo: ClientFormValues) => {
  try {
    const response = await axios.post(`${BASE_PATH}/clients`, userInfo);
    // console.log(response.data.data);
    return {
      msg: 'Client était ajouté avec succès',

      addedItem: response.data.data,
    };
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        `Ajouter le client a échoué avec le statut: ${err.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};

export const fetchClients = async (): Promise<ClientsInterface[]> => {
  try {
    const response = await axios.get<ClientsInterface[]>(
      `${BASE_PATH}/clients`
    );
    console.log(response.data);
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

export const getClientById = async (id: number): Promise<ClientsInterface> => {
  try {
    const response = await axios.get<ClientsInterface[]>(
      `${BASE_PATH}/clients/${id}`
    );
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
